import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
// import { Store } from '@ngrx/store';

import { empty } from 'rxjs/observable/empty';

// import * as FromRootReducer from '../reducers';

import { Fb1DataService } from '../services/fb1.data.service';
import { TodoCompletedDataService } from '../services/todo-completed.data.service';
import { TodoCompleted } from '../shared/models/todo-completed.model';

import {
  LoadSuccess,
  MoveToCurrent,
  DeleteItem,
  UpsertItem,
  TodoCompletedActionTypes,
  DatabaseListenForDataStart,
  DatabaseListenForDataStop,
} from '../actions/todo-completed.action';

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
    .do((x) => {
      console.log('Effect:listenForData$:A', x);
    })
    // .withLatestFrom(this.state$)
    .switchMap((action) => {
      if (
        action.type === TodoCompletedActionTypes.DATABASE_LISTEN_FOR_DATA_STOP
      ) {
        console.log('TodoCompletedAction.UNLISTEN_FOR_DATA');
        return empty();
      } else {
        return this.dataService.getData(
          action.payload.todoListId,
          action.payload.userId,
        );
      }
    })
    .do((x) => {
      console.log('Effect:listenForData$:B', x);
    })
    .map((items: TodoCompleted[]) => new LoadSuccess(items));

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
