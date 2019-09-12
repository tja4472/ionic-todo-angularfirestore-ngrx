import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { empty } from 'rxjs/observable/empty';

import {
  LoadSuccess,
  Remove,
  Save,
  TodoListsActionTypes,
  ListenForData,
  UnlistenForData,
} from './todo-lists.action';

import { TodoListsDataService } from './services/todo-lists.data.service';

// import { TodoListsItem } from './todo-lists-item.model';
import {
  AuthActionTypes,
  ListenForAuthSuccess,
  ListenForAuthNoUser,
} from '../app/auth/auth.action';
import * as authSelector from '../app/auth/auth.selector';

// import { of } from 'rxjs/observable/of';
// import { forkJoin } from 'rxjs/observable/forkJoin';
// import { combineLatest } from 'rxjs/observable/combineLatest';

@Injectable()
export class TodoListsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private dataService: TodoListsDataService,
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect()
  authListenForAuthSuccess$ = this.actions$.pipe(
    ofType<ListenForAuthSuccess>(AuthActionTypes.LISTEN_FOR_AUTH_SUCCESS),
    map((action) => action.payload),
    map(
      (payload) => new ListenForData({ userId: payload.signedInUser.userId }),
    ),
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  authListenForAuthNoUser$ = this.actions$.pipe(
    ofType<ListenForAuthNoUser>(AuthActionTypes.LISTEN_FOR_AUTH_NO_USER),
    // .map((action) => action.payload)
    map(() => new UnlistenForData()),
  );

  /*
  // tslint:disable-next-line:member-ordering
  @Effect()
  loadSuccess$ = this.actions$
    .ofType<LoadSuccess>(TodoListsActionTypes.LoadSuccess)
    .map((action) => action.payload)
    .map(
      (payload) => new set todoListId({ userId: payload.userId }),
    );
*/

  // tslint:disable-next-line:member-ordering
  @Effect()
  listenForData$ = this.actions$.pipe(
    ofType<ListenForData | UnlistenForData>(
      TodoListsActionTypes.ListenForData,
      TodoListsActionTypes.UnlistenForData,
    ),
    tap((x) => {
      console.log('Effect:listenForData$:A', x);
    }),
    switchMap((action) => {
      console.log('Effect:listenForData$:action>', action);

      if (action.type === TodoListsActionTypes.UnlistenForData) {
        console.log('TodoAction.UNLISTEN_FOR_DATA');
        return empty();
      } else {
        return this.dataService
          .getData(action.payload.userId)
          .map(
            (items) =>
              new LoadSuccess({ items, userId: action.payload.userId }),
          );
      }
    }),
    tap((x) => {
      console.log('xxxxxEffect:listenForData$:B', x);
    }),
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  removeItem$ = this.actions$.pipe(
    ofType<Remove>(TodoListsActionTypes.Remove),
    withLatestFrom(this.store.select(authSelector.getUserId)),
    tap(([action, userId]) => {
      console.log('Effect:removeItem$:A', { action, userId });
      this.dataService.removeItem(action.payload, userId);
    }),
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  save$ = this.actions$.pipe(
    ofType<Save>(TodoListsActionTypes.Save),
    withLatestFrom(this.store.select(authSelector.getUserId)),
    tap(([action, userId]) => {
      console.log('Effect:save$:A', { action, userId });

      this.dataService.save(action.payload, userId);
    }),
  );
}
