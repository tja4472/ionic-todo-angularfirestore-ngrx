import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { TodoCompleted } from '../shared/models/todo-completed.model';

const FIREBASE_COMPLETED_TODOS = 'completed-todos';

interface IFirestoreDoc {
    id: string;
    description?: string;
    name: string;
    isComplete: boolean;
}

@Injectable()
export class TodoCompletedDataService {

    private itemsCollection: AngularFirestoreCollection<IFirestoreDoc>;
    private items: Observable<IFirestoreDoc[]>;

    constructor(
        public readonly afs: AngularFirestore,
    ) {
        console.log('TodoCompletedDataService:constructor');
        this.itemsCollection = afs.collection<IFirestoreDoc>(
            FIREBASE_COMPLETED_TODOS,
            //           (ref) => ref.orderBy('index', 'asc'),
        );
        this.items = this.itemsCollection.valueChanges();
    }

    public getData(): Observable<TodoCompleted[]> {
        return this.itemsCollection
            .valueChanges()
            .do((x) => {
                console.log('TodoCompletedDataService:valueChanges()>', x);
            })
            .map((items) => items.map((item) => {
                return this.fromFirestoreDoc(item);
            }));
    }

    public removeItem(
        id: string,
    ): void {
        this.itemsCollection.doc(id).delete();
    }

    public save(
        item: TodoCompleted,
    ): void {
        const doc = this.toFirestoreDoc(item);

        if (item.isNew()) {
            doc.id = this.afs.createId();
        }

        this.itemsCollection.doc(doc.id).set(doc);
    }

    private toFirestoreDoc(
        item: TodoCompleted,
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
            isComplete: item.isComplete,
            name: item.name,
        };

        console.log('toFirebaseRecord>', result);
        return result;
    }

    private fromFirestoreDoc(
        x: IFirestoreDoc,
    ): TodoCompleted {
        console.log('TodoCompletedDataService:fromFirebaseRecord>', x);
        const result = new TodoCompleted(
            {
                $key: x.id,
                description: x.description,
                name: x.name,
            });

        return result;
    }
}
