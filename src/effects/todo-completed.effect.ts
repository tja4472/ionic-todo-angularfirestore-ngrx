import { Injectable } from '@angular/core';

import { Fb1DataService } from '../services/fb1.data.service';
import { TodoCompletedDataService } from '../services/todo-completed.data.service';

import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';

import {
  DatabaseListenForDataStart,
  DatabaseListenForDataStop,
  DeleteItem,
  LoadSuccess,
  MoveToCurrent,
  TodoCompletedActionTypes,
  UpsertItem,
} from '../actions/todo-completed.action';
import { TodoCompleted } from '../shared/models/todo-completed.model';

// import { Store } from '@ngrx/store';

// import * as FromRootReducer from '../reducers';

@Injectable()
export class TodoCompletedEffects {
  //
  constructor(
    private actions$: Actions,
    // private state$: Store<FromRootReducer.State>,
    private dataService: TodoCompletedDataService,
    private fb1DataService: Fb1DataService,
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect()
  listenForData$ = this.actions$
    .ofType<DatabaseListenForDataStart | DatabaseListenForDataStop>(
      TodoCompletedActionTypes.DATABASE_LISTEN_FOR_DATA_START,
      TodoCompletedActionTypes.DATABASE_LISTEN_FOR_DATA_STOP,
    )
    // Watch database node and get items.
    .switchMap((action) => {
      if (
        action.type === TodoCompletedActionTypes.DATABASE_LISTEN_FOR_DATA_STOP
      ) {
        return empty();
      } else {
        return this.dataService
          .getData(action.payload.todoListId, action.payload.userId)
          .map((items: TodoCompleted[]) => new LoadSuccess(items));
      }
    });

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  moveToCurrent$ = this.actions$
    .ofType(TodoCompletedActionTypes.MoveToCurrent)
    .map((action: MoveToCurrent) => action.payload)
    .do((payload) => {
      console.log('Effect:moveToCurrent$:A', payload);
      this.fb1DataService.moveToCurrent(
        payload.item,
        payload.todoListId,
        payload.userId,
      );
    });

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  removeItem$ = this.actions$
    .ofType(TodoCompletedActionTypes.DELETE_ITEM)
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
    .ofType(TodoCompletedActionTypes.UPSERT_ITEM)
    .map((action: UpsertItem) => action.payload)
    .do((payload) => {
      console.log('Effect:save$:A', payload);
      this.dataService.save(payload.item, payload.todoListId, payload.userId);
    });
}
