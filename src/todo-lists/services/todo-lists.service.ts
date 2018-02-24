import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators/take';

import { Store } from '@ngrx/store';

import { TodoListsItem } from '../todo-lists-item.model';

import * as FromRootReducer from '../../reducers/index';
import * as Actions from '../todo-lists.action';

@Injectable()
export class TodoListsService {
  constructor(private store: Store<FromRootReducer.State>) {}

  getItems$(): Observable<ReadonlyArray<TodoListsItem>> {
    return this.store.select(FromRootReducer.getTodoList_GetTodoLists);
  }

  getSelectedListId$(): Observable<string | null> {
    return this.store.select(FromRootReducer.getTodoList_GetSelectedListId);
  }

  initialise(): void {
    //
    this.store
      .select(FromRootReducer.getAuthState)
      .pipe(take(1))
      .subscribe((state) => {
        if (state.isAuthenticated) {
          this.store.dispatch(
            new Actions.ListenForData({
              userId: state.userId,
            }),
          );
        }
      });
  }

  unlisten(): void {
    this.store.dispatch(new Actions.UnlistenForData());
  }

  isLoaded(): Observable<boolean> {
    return this.store.select(FromRootReducer.getTodoList_GetLoaded);
  }

  isLoading(): Observable<boolean> {
    return this.store.select(FromRootReducer.getTodoList_GetLoading);
  }

  remove(todo: TodoListsItem) {
    this.store.dispatch(new Actions.Remove(todo.id));
  }

  save(todo: TodoListsItem) {
    this.store.dispatch(new Actions.Save(todo));
  }
}
