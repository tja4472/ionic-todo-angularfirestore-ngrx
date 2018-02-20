import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { empty } from 'rxjs/observable/empty';

import {
  LoadSuccess,
  DeleteItem,
  ReorderList,
  UpsertItem,
  TodoActionTypes,
  ClearCompleted,
  DatabaseListenForDataStart,
  DatabaseListenForDataStop,
} from '../actions/todo.action';

import * as FromRootReducer from '../reducers';
import { Fb1DataService } from '../services/fb1.data.service';
import { TodoDataService } from '../services/todo.data.service';
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
  clearCompleted$ = this.actions$
    .ofType<ClearCompleted>(TodoActionTypes.ClearCompleted)
    .withLatestFrom(this.store)
    .do(([action, state]) => {
      const completed = state.todo.todos.filter((a) => a.isComplete);
      this.fb1DataService.clearCompletedTodos(
        completed,
        action.payload.todoListId,
        action.payload.userId,
      );
    });

      // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  test$ = this.actions$
    .ofType<DatabaseListenForDataStart | DatabaseListenForDataStop>(
      TodoActionTypes.DATABASE_LISTEN_FOR_DATA_START,
      TodoActionTypes.DATABASE_LISTEN_FOR_DATA_STOP,
    )
    .merge(this.store.select((state) => state.user.todoListId))
    .do((x) => {
      console.log('Effect:test$:x', x);
      // console.log('Effect:test$:y', y);
    });

  // tslint:disable-next-line:member-ordering
  @Effect()
  listenForData$ = this.actions$
    .ofType<DatabaseListenForDataStart | DatabaseListenForDataStop>(
      TodoActionTypes.DATABASE_LISTEN_FOR_DATA_START,
      TodoActionTypes.DATABASE_LISTEN_FOR_DATA_STOP,
    )
    .combineLatest(this.store.select((state) => state.user.todoListId))
        .do((x) => {
      console.log('Effect:listenForData$:A', x);
    })
    // .withLatestFrom(this.state$)
    // tslint:disable-next-line:no-unused-variable
    // .filter(([, state]) => state.login.isAuthenticated)
    // Watch database node and get items.
    .switchMap(([action, todoListId]) => {
      console.log('Effect:listenForData$:action>', action);

      if (action.type === TodoActionTypes.DATABASE_LISTEN_FOR_DATA_STOP) {
        console.log('TodoAction.UNLISTEN_FOR_DATA');
        return empty();
      } else {
        return this.dataService
          .getData(todoListId, action.payload.userId)
          .map((items: Todo[]) => new LoadSuccess(items));
      }
    })
    .do((x) => {
      console.log('Effect:listenForData$:B', x);
    });
  // .map((items: Todo[]) => new LoadSuccess(items));

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
  reorderList$ = this.actions$
    .ofType<ReorderList>(TodoActionTypes.ReorderList)
    .withLatestFrom(this.store)
    .do(([action, state]) => {
      this.dataService.reorderItemsAndUpdate(
        action.payload.indexes,
        state.todo.todos,
        action.payload.todoListId,
        action.payload.userId,
      );
    });

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  removeItem$ = this.actions$
    .ofType(TodoActionTypes.DELETE_ITEM)
    .map((action: DeleteItem) => action.payload)
    .do((payload) => {
      console.log('Effect:removeItem$:A', payload);
      this.dataService.removeItem(
        payload.itemId,
        payload.todoListId,
        payload.userId,
      );
    });

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  save$ = this.actions$
    .ofType(TodoActionTypes.UPSERT_ITEM)
    .map((action: UpsertItem) => action.payload)
    .do((payload) => {
      console.log('Effect:save$:A', payload);
      this.dataService.save(payload.item, payload.todoListId, payload.userId);
    });
}
