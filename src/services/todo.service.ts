import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

import {
  ClearCompleted,
  DatabaseListenForDataStart,
  DatabaseListenForDataStop,
  DeleteItem,
  ReorderList,
  UpsertItem,
} from '../actions/todo.action';
import * as FromRootReducer from '../reducers';
import { ReorderArrayIndexes } from '../shared/models/reorder-array-indexes.model';
import { Todo } from '../shared/models/todo.model';

@Injectable()
export class TodoService {
  constructor(private store: Store<FromRootReducer.State>) {}

  clearCompletedItems() {
    //
    this.store
      .select(FromRootReducer.getAuthState)
      .pipe(take(1))
      .subscribe((state) => {
        if (state.isAuthenticated) {
          this.store.dispatch(
            new ClearCompleted({
              todoListId: state.todoListId,
              userId: state.userId,
            }),
          );
        }
      });
  }

  getData$(): Observable<Todo[]> {
    return this.store.select(FromRootReducer.getTodo_GetTodos);
  }

  public ListenForDataStart(): void {
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

  public ListenForDataStop(): void {
    this.store.dispatch(new DatabaseListenForDataStop());
  }

  isLoaded(): Observable<boolean> {
    return this.store.select(FromRootReducer.getTodo_GetLoaded);
  }

  isLoading(): Observable<boolean> {
    return this.store.select(FromRootReducer.getTodo_GetLoading);
  }

  public reorderItems(indexes: ReorderArrayIndexes) {
    //
    this.store
      .select(FromRootReducer.getAuthState)
      .pipe(take(1))
      .subscribe((state) => {
        if (state.isAuthenticated) {
          this.store.dispatch(
            new ReorderList({
              indexes,
              todoListId: state.todoListId,
              userId: state.userId,
            }),
          );
        }
      });
  }

  public deleteItem(item: Todo) {
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

  public upsertItem(item: Todo) {
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
