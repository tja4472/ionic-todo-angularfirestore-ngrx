import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Use Deep imports here for smallest bunlde size
import { map } from 'rxjs/operators/map';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { IReorderArrayIndexes } from '../shared/models/reorder-array-indexes.model';
import { Todo } from '../shared/models/todo.model';

import { reorderArray } from 'ionic-angular';

import { LoginService } from './login.service';
import { SignedInUser } from '../models/signed-in-user.model';

const DATA_COLLECTION = 'current-todos';
const USERS_COLLECTION = 'users';

interface IFirestoreDoc {
    id: string;
    description?: string;
    index: number;
    name: string;
    isComplete: boolean;
}

@Injectable()
export class TodoDataService {
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

    public getData(): Observable<Todo[]> {
        //
        if (this.isSignedIn) {
            return this.itemsCollection
                .valueChanges()
                .pipe(
                    map((items) => items.map((item) => {
                        return this.fromFirestoreDoc(item);
                    })),
                );
        } else {
            return Observable.from<Todo[]>([]);
        }
    }

    public reorderItemsAndUpdate(
        indexes: IReorderArrayIndexes,
        todos: Todo[],
    ): void {
        const itemsToSave = [...todos];
        reorderArray(itemsToSave, indexes);
        itemsToSave.forEach((t, i) => {
            if (t.$key === undefined) {
                return;
            }

            this.itemsCollection.doc(t.$key).update({ index: i });
        });
    }

    public removeItem(
        id: string,
    ): void {
        this.itemsCollection.doc(id).delete();
    }

    public save(
        item: Todo,
    ): void {
        const doc = this.toFirestoreDoc(item);

        if (item.isNew()) {
            doc.id = this.afs.createId();
        }

        this.itemsCollection.doc(doc.id).set(doc);
    }

    private init(): void {
        this.itemsCollection = this.afs.collection(USERS_COLLECTION)
            .doc(this.loginService.signedInUser.userId)
            .collection<IFirestoreDoc>(
            DATA_COLLECTION,
            (ref) => ref.orderBy('index', 'asc'),
        );
    }

    private toFirestoreDoc(
        item: Todo,
    ): IFirestoreDoc {
        //
        let id: string;

        if (item.$key === undefined) {
            id = '';
        } else {
            id = item.$key;
        }

        const result: IFirestoreDoc = {
            description: item.description,
            id,
            index: item.index,
            isComplete: item.isComplete,
            name: item.name,
        };

        // console.log('toFirebaseTodo>', result);
        return result;
    }

    private fromFirestoreDoc(
        x: IFirestoreDoc,
    ): Todo {
        //
        // console.log('TodoDataService:fromFirebaseTodo>', x);

        const result: Todo = new Todo(
            {
                $key: x.id,
                description: x.description,
                index: x.index,
                isComplete: x.isComplete,
                name: x.name,
            });

        // console.log('TodoDataService:fromFirebaseTodo:result>', result);

        if (result.isComplete === undefined) {
            result.isComplete = false;
        }

        return result;
    }
}
