import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { TodoCompleted } from '../shared/models/todo-completed.model';

import * as FromRootReducer from '../reducers/index';
import * as TodoCompletedActions from '../actions/todo-completed.action';
import {
  DatabaseListenForDataStart,
  DeleteItem,
  UpsertItem,
  MoveToCurrent,
} from '../actions/todo-completed.action';

@Injectable()
export class TodoCompletedService {
  constructor(private store: Store<FromRootReducer.State>) {}

  getData(): Observable<TodoCompleted[]> {
    /*
                this.store.select(s => s.todoCompleted)
                .subscribe(x => console.log('sssss>', x));
                let a = this.store.select(s => s.todoCompleted.todoCompletedList);
                return a;
        */
    return this.store.select(
      FromRootReducer.getTodoCompleted_GetTodoCompletedList,
    );
  }

  ListenForDataStart(): void {
    //
    this.store
      .select(FromRootReducer.getAuthState)
      .pipe(take(1))
      .subscribe((state) => {
        if (state.isAuthenticated) {
          this.store.dispatch(
            new DatabaseListenForDataStart({
              todoListId: state.todoListId,
              userId: state.userId,
            }),
          );
        }
      });
  }

  ListenForDataStop(): void {
    this.store.dispatch(new TodoCompletedActions.DatabaseListenForDataStop());
  }

  isLoaded(): Observable<boolean> {
    return this.store.select(FromRootReducer.getTodoCompleted_GetLoaded);
  }

  isLoading(): Observable<boolean> {
    return this.store.select(FromRootReducer.getTodoCompleted_GetLoading);
  }

  moveToCurrent(item: TodoCompleted) {
    //
    this.store
      .select(FromRootReducer.getAuthState)
      .pipe(take(1))
      .subscribe((state) => {
        if (state.isAuthenticated) {
          this.store.dispatch(
            new MoveToCurrent({
              item,
              todoListId: state.todoListId,
              userId: state.userId,
            }),
          );
        }
      });
  }

  public deleteItem(item: TodoCompleted) {
    //
    this.store
      .select(FromRootReducer.getAuthState)
      .pipe(take(1))
      .subscribe((state) => {
        if (state.isAuthenticated) {
          this.store.dispatch(
            new DeleteItem({
              itemId: item.id,
              todoListId: state.todoListId,
              userId: state.userId,
            }),
          );
        }
      });
  }

  public upsertItem(item: TodoCompleted) {
    //
    this.store
      .select(FromRootReducer.getAuthState)
      .pipe(take(1))
      .subscribe((state) => {
        if (state.isAuthenticated) {
          this.store.dispatch(
            new UpsertItem({
              item,
              todoListId: state.todoListId,
              userId: state.userId,
            }),
          );
        }
      });
  }
}
