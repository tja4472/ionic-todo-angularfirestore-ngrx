import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { AngularFirestore } from 'angularfire2/firestore';
import { User } from './user.model';

const USERS_COLLECTION = 'users';

interface FirestoreDoc {
  todoListId: string;
}

@Injectable()
export class UserDataService {
  //
  constructor(public readonly afs: AngularFirestore) {
    console.log('TodoDataService:constructor');
  }

  public getItem$(userId: string): Observable<User | null> {
    //
    return this.firestoreDocument(userId)
      .valueChanges()
      .pipe(map((item) => this.fromFirestoreDoc(item)));
  }

  public save(item: User, userId: string): void {
    const doc = this.toFirestoreDoc(item);

    /*
    this.firestoreDocument(userId).valueChanges().pipe(take(1)).subscribe((x) => {
        console.log('KKKK>', x);
    });
    */
    this.firestoreDocument(userId).set(doc);
  }

  private firestoreDocument(userId: string) {
    //
    return this.afs.collection(USERS_COLLECTION).doc<FirestoreDoc>(userId);
  }

  private toFirestoreDoc(item: User): FirestoreDoc {
    //
    const result: FirestoreDoc = {
      todoListId: item.todoListId,
    };

    return result;
  }

  private fromFirestoreDoc(x: FirestoreDoc | null): User | null {
    //
    console.log('ZZZZZZZZZZZZZZZZZ>', x);

    if (x == null) {
      return null;
    }

    const result: User = {
      todoListId: x.todoListId,
    };

    return result;
  }
}
