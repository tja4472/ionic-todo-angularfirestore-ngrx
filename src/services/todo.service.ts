import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { ReorderArrayIndexes } from '../shared/models/reorder-array-indexes.model';
import { Todo } from '../shared/models/todo.model';

import * as FromRootReducer from '../reducers/index';
import * as TodoActions from '../actions/todo.action';

@Injectable()
export class TodoService {
  constructor(private store: Store<FromRootReducer.State>) {}

  clearCompletedItems() {
    this.store.dispatch(new TodoActions.ClearCompleted());
  }

  getData(): Observable<Todo[]> {
    return this.store.select(FromRootReducer.getTodo_GetTodos);
  }

  initialise(): void {
    this.store.dispatch(new TodoActions.ListenForData());
  }

  unlisten(): void {
    this.store.dispatch(new TodoActions.UnlistenForData());
  }

  isLoaded(): Observable<boolean> {
    return this.store.select(FromRootReducer.getTodo_GetLoaded);
  }

  isLoading(): Observable<boolean> {
    return this.store.select(FromRootReducer.getTodo_GetLoading);
  }

  reorderItems(indexes: ReorderArrayIndexes) {
    this.store.dispatch(new TodoActions.ReorderList(indexes));
  }

  remove(todo: Todo) {
    this.store.dispatch(new TodoActions.Remove(todo.id));
  }

  save(todo: Todo) {
    this.store.dispatch(new TodoActions.Save(todo));
  }
}
