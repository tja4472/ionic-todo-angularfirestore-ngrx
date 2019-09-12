import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import {
  AngularFirestore,
  // AngularFirestoreCollection,
} from 'angularfire2/firestore';

import { TodoListsItem } from '../todo-lists-item.model';

const DATA_COLLECTION = 'todo-lists';
const USERS_COLLECTION = 'users';

interface FirestoreDoc {
  id: string;
  name: string;
}

@Injectable()
export class TodoListsDataService {
  constructor(public readonly afs: AngularFirestore) {
    console.log('TodoDataService:constructor');
  }

  public getData(userId: string): Observable<TodoListsItem[]> {
    //
    return this.firestoreCollection(userId)
      .valueChanges()
      .pipe(
        map((items) =>
          items.map((item) => {
            return this.fromFirestoreDoc(item);
          }),
        ),
      );
  }

  public removeItem(id: string, userId: string): void {
    this.firestoreCollection(userId).doc(id).delete();
  }

  public save(item: TodoListsItem, userId: string): void {
    const doc = this.toFirestoreDoc(item);

    if (item.isNew()) {
      doc.id = this.afs.createId();
    }

    this.firestoreCollection(userId).doc(doc.id).set(doc);
  }

  private firestoreCollection(userId: string) {
    //
    return this.afs
      .collection(USERS_COLLECTION)
      .doc(userId)
      .collection<FirestoreDoc>(DATA_COLLECTION, (ref) =>
        ref.orderBy('name', 'asc'),
      );
  }

  private toFirestoreDoc(item: TodoListsItem): FirestoreDoc {
    //
    const result: FirestoreDoc = {
      id: item.id,
      name: item.name,
    };

    return result;
  }

  private fromFirestoreDoc(x: FirestoreDoc): TodoListsItem {
    //
    const result: TodoListsItem = new TodoListsItem({
      id: x.id,
      name: x.name,
    });

    return result;
  }
}
