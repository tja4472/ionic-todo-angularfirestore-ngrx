import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';

import {
  TodoCompleted,
  newTodoCompleted,
} from '../shared/models/todo-completed.model';

import { LoginService } from './login.service';
import { SignedInUser } from '../models/signed-in-user.model';

// const FIREBASE_COMPLETED_TODOS = 'completed-todos';
const DATA_COLLECTION = 'completed-todos';
const USERS_COLLECTION = 'users';

interface FirestoreDoc {
  id: string;
  description?: string;
  name: string;
  isComplete: boolean;
}

@Injectable()
export class TodoCompletedDataService {
  private itemsCollection: AngularFirestoreCollection<FirestoreDoc>;
  // private items: Observable<IFirestoreDoc[]>;
  private isSignedIn: boolean;

  constructor(
    public readonly afs: AngularFirestore,
    private loginService: LoginService,
  ) {
    console.log('TodoCompletedDataService:constructor');

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

  public getData(): Observable<TodoCompleted[]> {
    //
    if (this.isSignedIn) {
      return this.itemsCollection.valueChanges().map((items) =>
        items.map((item) => {
          return this.fromFirestoreDoc(item);
        }),
      );
    } else {
      return Observable.from<TodoCompleted[]>([]);
    }
  }

  public removeItem(id: string): void {
    this.itemsCollection.doc(id).delete();
  }

  public save(item: TodoCompleted): void {
    const doc = this.toFirestoreDoc(item);

    if (item.id === '') {
      doc.id = this.afs.createId();
    }

    this.itemsCollection.doc(doc.id).set(doc);
  }

  private init(): void {
    this.itemsCollection = this.afs
      .collection(USERS_COLLECTION)
      .doc(this.loginService.signedInUser.userId)
      .collection<FirestoreDoc>(
        // Filter by taskListId
        // DATA_COLLECTION, (ref) => ref.where('name', '==', 'bb')
        DATA_COLLECTION,
      );
  }

  private toFirestoreDoc(item: TodoCompleted): FirestoreDoc {
    //
    let id: string;

    if (item.id === undefined) {
      id = '';
    } else {
      id = item.id;
    }

    const result: FirestoreDoc = {
      description: item.description,
      id,
      isComplete: item.isComplete,
      name: item.name,
    };

    console.log('toFirebaseRecord>', result);
    return result;
  }

  private fromFirestoreDoc(x: FirestoreDoc): TodoCompleted {
    console.log('TodoCompletedDataService:fromFirebaseRecord>', x);
    const result: TodoCompleted = {
      ...newTodoCompleted(),
      description: x.description,
      id: x.id,
      name: x.name,
    };

    return result;
  }
}
