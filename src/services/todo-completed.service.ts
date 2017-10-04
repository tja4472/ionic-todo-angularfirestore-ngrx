import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { TodoCompleted } from '../shared/models/todo-completed.model';

import * as FromRootReducer from '../reducers/index';
import * as TodoCompletedActions from '../actions/todo-completed.action';

@Injectable()
export class TodoCompletedService {
    constructor(
        private store: Store<FromRootReducer.IState>
    ) {
    }

    getData(): Observable<TodoCompleted[]> {
        /*
                this.store.select(s => s.todoCompleted)
                .subscribe(x => console.log('sssss>', x));
                let a = this.store.select(s => s.todoCompleted.todoCompletedList);
                return a;
        */
        return this.store.select(FromRootReducer.getTodoCompleted_GetTodoCompletedList);
    }

    initialise(): void {
        this.store.dispatch(
            new TodoCompletedActions.Load());
    }

    isLoaded(): Observable<boolean> {
        return this.store.select(FromRootReducer.getTodoCompleted_GetLoaded);
    }

    isLoading(): Observable<boolean> {
        return this.store.select(FromRootReducer.getTodoCompleted_GetLoading);
    }

    moveToCurrent(item: TodoCompleted) {
        this.store.dispatch(
            new TodoCompletedActions.MoveToCurrent(item));
    }

    remove(todo: TodoCompleted) {
        if (todo.$key === undefined) {
            return;
        }

        this.store.dispatch(
            new TodoCompletedActions.Remove(todo.$key));
    }

    save(item: TodoCompleted) {
        this.store.dispatch(
            new TodoCompletedActions.Save(item));
    }
}
