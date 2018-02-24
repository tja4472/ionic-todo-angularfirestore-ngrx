import { Injectable } from '@angular/core';

import { Fb1DataService } from '../services/fb1.data.service';
import { TodoDataService } from '../services/todo.data.service';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { empty } from 'rxjs/observable/empty';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import {
  ClearCompleted,
  DatabaseListenForDataStart,
  DatabaseListenForDataStop,
  DeleteItem,
  LoadSuccess,
  ReorderList,
  TodoActionTypes,
  UpsertItem,
} from '../actions/todo.action';
import * as FromRootReducer from '../reducers';
import { Todo } from '../shared/models/todo.model';

@Injectable()
export class TodoEffects {
  //
  constructor(
    private actions$: Actions,
    private store: Store<FromRootReducer.State>,
    private dataService: TodoDataService,
    private fb1DataService: Fb1DataService,
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  clearCompleted$ = this.actions$.pipe(
    ofType<ClearCompleted>(TodoActionTypes.ClearCompleted),
    withLatestFrom(this.store),
    tap(([action, state]) => {
      const completed = state.todo.todos.filter((a) => a.isComplete);
      this.fb1DataService.clearCompletedTodos(
        completed,
        action.payload.todoListId,
        action.payload.userId,
      );
    }));

  // tslint:disable-next-line:member-ordering
  @Effect()
  listenForData$ = this.actions$
    .ofType<DatabaseListenForDataStart | DatabaseListenForDataStop>(
      TodoActionTypes.DATABASE_LISTEN_FOR_DATA_START,
      TodoActionTypes.DATABASE_LISTEN_FOR_DATA_STOP,
    )
    // Watch database node and get items.
    .switchMap((action) => {
      if (action.type === TodoActionTypes.DATABASE_LISTEN_FOR_DATA_STOP) {
        return empty();
      } else {
        return this.dataService
          .getData$(action.payload.todoListId, action.payload.userId)
          .map((items: Todo[]) => new LoadSuccess(items));
      }
    });

  /*
    @Effect() loadCollection$ = this.updates$
      .whenAction(ToDoActions.LOAD)
      .do(x => { console.log('Effect:loadCollection$:A', x); })
      .filter(x => x.state.login.isAuthenticated)

      // Watch database node and get items.
      .switchMap(x => this.todoDataService.getData())
      .do(x => { console.log('Effect:loadCollection$:B', x); })
      .map((items: ToDo[]) => this.todoActions.loadSuccess(items));
    // Terminate effect.
    // .ignoreElements());
  */
  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  reorderList$ = this.actions$.pipe(
    ofType<ReorderList>(TodoActionTypes.ReorderList),
    withLatestFrom(this.store),
    tap(([action, state]) => {
      this.dataService.reorderItemsAndUpdate(
        action.payload.indexes,
        state.todo.todos,
        action.payload.todoListId,
        action.payload.userId,
      );
    }));

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  removeItem$ = this.actions$.pipe(
    ofType(TodoActionTypes.DELETE_ITEM),
    map((action: DeleteItem) => action.payload),
    tap((payload) => {
      console.log('Effect:removeItem$:A', payload);
      this.dataService.removeItem(
        payload.itemId,
        payload.todoListId,
        payload.userId,
      );
    }));

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  save$ = this.actions$.pipe(
    ofType(TodoActionTypes.UPSERT_ITEM),
    map((action: UpsertItem) => action.payload),
    tap((payload) => {
      console.log('Effect:save$:A', payload);
      this.dataService.save(payload.item, payload.todoListId, payload.userId);
    }));
}
