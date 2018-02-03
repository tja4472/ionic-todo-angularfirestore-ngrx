import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';

import { TodoListsItem } from '../todo-lists-item.model';

import { LoginService } from '../../services/login.service';
import { SignedInUser } from '../../models/signed-in-user.model';

const DATA_COLLECTION = 'todo-lists';
const USERS_COLLECTION = 'users';

interface IFirestoreDoc {
  id: string;
  name: string;
}

@Injectable()
export class TodoListsDataService {
  private itemsCollection: AngularFirestoreCollection<IFirestoreDoc>;

  private isSignedIn: boolean;

  constructor(
    public readonly afs: AngularFirestore,
    private loginService: LoginService,
  ) {
    console.log('TodoDataService:constructor');

    this.loginService.notifier$.subscribe((signedInUser: SignedInUser) => {
      console.log('TodoDataService:signedInUser>', signedInUser);
      if (signedInUser) {
        this.isSignedIn = true;
        this.init();
      } else {
        this.isSignedIn = false;
      }
    });
  }

  public getData(): Observable<TodoListsItem[]> {
    //
    if (this.isSignedIn) {
      return this.itemsCollection.valueChanges().map((items) =>
        items.map((item) => {
          return this.fromFirestoreDoc(item);
        }),
      );
    } else {
      return Observable.from<TodoListsItem[]>([]);
    }
  }

  public removeItem(id: string): void {
    this.itemsCollection.doc(id).delete();
  }

  public save(item: TodoListsItem): void {
    const doc = this.toFirestoreDoc(item);

    if (item.isNew()) {
      doc.id = this.afs.createId();
    }

    this.itemsCollection.doc(doc.id).set(doc);
  }

  private init(): void {
    this.itemsCollection = this.afs
      .collection(USERS_COLLECTION)
      .doc(this.loginService.signedInUser.userId)
      .collection<IFirestoreDoc>(DATA_COLLECTION, (ref) =>
        ref.orderBy('name', 'asc'),
      );
  }

  private toFirestoreDoc(item: TodoListsItem): IFirestoreDoc {
    //

    const result: IFirestoreDoc = {
      id: item.id,
      name: item.name,
    };

    // console.log('toFirebaseTodo>', result);
    return result;
  }

  private fromFirestoreDoc(x: IFirestoreDoc): TodoListsItem {
    //
    // console.log('TodoDataService:fromFirebaseTodo>', x);

    const result: TodoListsItem = new TodoListsItem({
      id: x.id,
      name: x.name,
    });

    // console.log('TodoDataService:fromFirebaseTodo:result>', result);

    return result;
  }
}
