import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { empty } from 'rxjs/observable/empty';

import * as FromRootReducer from '../reducers';

import * as FromAction from './todo-lists.action';

import { TodoListsDataService } from './services/todo-lists.data.service';

import { TodoListsItem } from './todo-lists-item.model';

@Injectable()
export class TodoListsEffects {
  constructor(
    private actions$: Actions,
    private state$: Store<FromRootReducer.IState>,

    private dataService: TodoListsDataService
  ) { }

  // tslint:disable-next-line:member-ordering
  @Effect() listenForData$ = this.actions$
    .ofType(FromAction.LISTEN_FOR_DATA, FromAction.UNLISTEN_FOR_DATA)
    .do((x) => { console.log('Effect:listenForData$:A', x); })
    .withLatestFrom(this.state$)
    // tslint:disable-next-line:no-unused-variable
    // .filter(([, state]) => state.login.isAuthenticated)
    // Watch database node and get items.
    .switchMap(([action]) => {
      console.log('Effect:listenForData$:action>', action);

      if (action.type === FromAction.UNLISTEN_FOR_DATA) {
        console.log('TodoAction.UNLISTEN_FOR_DATA');
        return empty();
      } else {
        return this.dataService.getData();
      }
    })
    .do((x) => { console.log('Effect:listenForData$:B', x); })
    .map((items: TodoListsItem[]) => new FromAction.LoadSuccess(items));

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) removeItem$ = this.actions$
    .ofType(FromAction.REMOVE)
    .map((action: FromAction.Remove) => action.payload)
    .do((payload) => {
      console.log('Effect:removeItem$:A', payload);
      this.dataService.removeItem(payload);
    });

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) save$ = this.actions$
    .ofType(FromAction.SAVE)
    .map((action: FromAction.Save) => action.payload)
    .do((payload) => {
      console.log('Effect:save$:A', payload);
      this.dataService.save(payload);
    });
}