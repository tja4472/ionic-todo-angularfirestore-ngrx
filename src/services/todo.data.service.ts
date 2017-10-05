import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { IReorderArrayIndexes } from '../shared/models/reorder-array-indexes.model';
import { Todo } from '../shared/models/todo.model';

import { reorderArray } from 'ionic-angular';

const FIREBASE_CURRENT_TODOS = 'current-todos';

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
    private items: Observable<IFirestoreDoc[]>;

    constructor(
        public readonly afs: AngularFirestore,
    ) {
        console.log('TodoDataService:constructor');
        this.itemsCollection = afs.collection<IFirestoreDoc>(
            FIREBASE_CURRENT_TODOS,
            (ref) => ref.orderBy('index', 'asc'),
        );
        this.items = this.itemsCollection.valueChanges();
    }

    public getData(): Observable<Todo[]> {
        return this.itemsCollection
            .valueChanges()
            .do((x) => {
                console.log('TodoDataService:valueChanges()>', x);
            })
            .map((items) => items.map((item) => {
                return this.fromFirestoreDoc(item);
            }));
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
