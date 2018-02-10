import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore } from 'angularfire2/firestore';

import {
  TodoCompleted,
  newTodoCompleted,
} from '../shared/models/todo-completed.model';

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
  //
  constructor(public readonly afs: AngularFirestore) {
    console.log('TodoCompletedDataService:constructor');
  }

  public getData(
    todoListId: string,
    userId: string,
  ): Observable<TodoCompleted[]> {
    //
    return this.firestoreCollection(todoListId, userId)
      .valueChanges()
      .map((items) =>
        items.map((item) => {
          return this.fromFirestoreDoc(item);
        }),
      );
  }

  public removeItem(id: string, todoListId: string, userId: string): void {
    this.firestoreCollection(todoListId, userId)
      .doc(id)
      .delete();
  }

  public save(item: TodoCompleted, todoListId: string, userId: string): void {
    const doc = this.toFirestoreDoc(item);

    if (item.id === '') {
      doc.id = this.afs.createId();
    }

    this.firestoreCollection(todoListId, userId)
      .doc(doc.id)
      .set(doc);
  }

  private firestoreCollection(todoListId: string, userId: string) {
    //
    return this.afs
      .collection(USERS_COLLECTION)
      .doc(userId)
      .collection('todo-lists')
      .doc(todoListId)
      .collection<FirestoreDoc>(DATA_COLLECTION);
  }

  private toFirestoreDoc(item: TodoCompleted): FirestoreDoc {
    //
    const result: FirestoreDoc = {
      description: item.description,
      id: item.id,
      isComplete: item.isComplete,
      name: item.name,
    };

    return result;
  }

  private fromFirestoreDoc(x: FirestoreDoc): TodoCompleted {
    //
    const result: TodoCompleted = {
      ...newTodoCompleted(),
      description: x.description,
      id: x.id,
      name: x.name,
    };

    return result;
  }
}
