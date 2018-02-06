import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { empty } from 'rxjs/observable/empty';

import * as FromRootReducer from '../reducers';

import { Fb1DataService } from '../services/fb1.data.service';
import { TodoCompletedDataService } from '../services/todo-completed.data.service';
import { TodoCompleted } from '../shared/models/todo-completed.model';

import {
  LoadSuccess,
  MoveToCurrent,
  Remove,
  Save,
  TodoCompletedActionTypes,
} from '../actions/todo-completed.action';

@Injectable()
export class TodoCompletedEffects {
  constructor(
    private actions$: Actions,
    private state$: Store<FromRootReducer.State>,
    private dataService: TodoCompletedDataService,
    private fb1DataService: Fb1DataService,
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect()
  listenForData$ = this.actions$
    .ofType(
      TodoCompletedActionTypes.ListenForData,
      TodoCompletedActionTypes.UnlistenForData,
    )
    .do((x) => {
      console.log('Effect:listenForData$:A', x);
    })
    .withLatestFrom(this.state$)
    // .filter(([, state]) => state.login.isAuthenticated)
    // Watch database node and get items.
    .switchMap(([action]) => {
      if (action.type === TodoCompletedActionTypes.UnlistenForData) {
        console.log('TodoCompletedAction.UNLISTEN_FOR_DATA');
        return empty();
      } else {
        return this.dataService.getData();
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
      this.fb1DataService.moveToCurrent(payload);
    });
  /*
    @Effect() moveToCurrent$ = this.updates$
      .whenAction(TodoCompletedActions.MOVE_TO_CURRENT)
      .do(x => {
        console.log('Effect:moveToCurrent$:A', x);
        this.fb1DataService.moveToCuurent(
          x.action.payload);
      })

      // Terminate effect.
      .ignoreElements();
  */
  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  removeItem$ = this.actions$
    .ofType(TodoCompletedActionTypes.Remove)
    .map((action: Remove) => action.payload)
    .do((payload) => {
      console.log('Effect:removeItem$:A', payload);
      this.dataService.removeItem(payload);
    });
  /*
    @Effect() removeItem$ = this.updates$
      .whenAction(TodoCompletedActions.REMOVE)
      .do(x => {
        console.log('Effect:removeItem$:A', x);
        this.dataService.removeItem(
          x.action.payload);
      })

      // Terminate effect.
      .ignoreElements();
  */

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  save$ = this.actions$
    .ofType(TodoCompletedActionTypes.Save)
    .map((action: Save) => action.payload)
    .do((payload) => {
      console.log('Effect:save$:A', payload);
      this.dataService.save(payload);
    });
  /*
    @Effect() save$ = this.updates$
      .whenAction(TodoCompletedActions.SAVE)
      .do(x => {
        console.log('Effect:save$:A', x);
        this.dataService.save(
          x.action.payload);
      })

      // Terminate effect.
      .ignoreElements();
  */
}
