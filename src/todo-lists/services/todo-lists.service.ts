import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { TodoListsItem} from '../todo-lists-item.model';

import * as FromRootReducer from '../../reducers/index';
import * as Actions from '../todo-lists.action';

@Injectable()
export class TodoListsService {
    constructor(
        private store: Store<FromRootReducer.IState>
    ) {
    }

    getData(): Observable<TodoListsItem[]> {
        return this.store.select(FromRootReducer.getTodoList_GetTodoLists);
    }

    initialise(): void {
        this.store.dispatch(
            new Actions.ListenForData());
    }

    unlisten(): void {
        this.store.dispatch(
            new Actions.UnlistenForData());
    }

    isLoaded(): Observable<boolean> {
        return this.store.select(FromRootReducer.getTodoList_GetLoaded);
    }

    isLoading(): Observable<boolean> {
        return this.store.select(FromRootReducer.getTodoList_GetLoading);
    }

    remove(todo: TodoListsItem) {
        this.store.dispatch(
            new Actions.Remove(todo.id));
    }

    save(todo: TodoListsItem) {
        this.store.dispatch(
            new Actions.Save(todo));
    }
}
