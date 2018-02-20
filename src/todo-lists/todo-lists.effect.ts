import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
// import { Store } from '@ngrx/store';

import { empty } from 'rxjs/observable/empty';

// import * as FromRootReducer from '../reducers';

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
// import { of } from 'rxjs/observable/of';
// import { forkJoin } from 'rxjs/observable/forkJoin';
// import { combineLatest } from 'rxjs/observable/combineLatest';

@Injectable()
export class TodoListsEffects {
  constructor(
    private actions$: Actions,
    // private state$: Store<FromRootReducer.State>,
    private dataService: TodoListsDataService,
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect()
  authListenForAuthSuccess$ = this.actions$
    .ofType<ListenForAuthSuccess>(AuthActionTypes.LISTEN_FOR_AUTH_SUCCESS)
    .map((action) => action.payload)
    .map(
      (payload) => new ListenForData({ userId: payload.signedInUser.userId }),
    );

  // tslint:disable-next-line:member-ordering
  @Effect()
  authListenForAuthNoUser$ = this.actions$
    .ofType<ListenForAuthNoUser>(AuthActionTypes.LISTEN_FOR_AUTH_NO_USER)
    // .map((action) => action.payload)
    .map(() => new UnlistenForData());

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
  listenForData$ = this.actions$
    .ofType<ListenForData | UnlistenForData>(
      TodoListsActionTypes.ListenForData,
      TodoListsActionTypes.UnlistenForData,
    )
    .do((x) => {
      console.log('Effect:listenForData$:A', x);
    })
    .switchMap((action) => {
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
    })
    .do((x) => {
      console.log('xxxxxEffect:listenForData$:B', x);
    });
  //  .map(([x, y]) => new LoadSuccess({ items: x, userId: y }));
  // .map((items: TodoListsItem[]) => new LoadSuccess({ items, action.payload.userId}));

  /*
  // tslint:disable-next-line:member-ordering
  @Effect()
  listenForData$ = this.actions$
    .ofType<ListenForData | UnlistenForData>(
      TodoListsActionTypes.ListenForData,
      TodoListsActionTypes.UnlistenForData,
    )
    .do((x) => {
      console.log('Effect:listenForData$:A', x);
    })
    // .withLatestFrom(this.state$)
    // tslint:disable-next-line:no-unused-variable
    // .filter(([, state]) => state.login.isAuthenticated)
    // Watch database node and get items.
    .switchMap((action) => {
      console.log('Effect:listenForData$:action>', action);

      if (action.type === TodoListsActionTypes.UnlistenForData) {
        console.log('TodoAction.UNLISTEN_FOR_DATA');
        return empty();
      } else {
        return combineLatest([
          this.dataService.getData(action.payload.userId),
          of(action.payload.userId),
        ]);
      }
    })
    .do(([x, y]) => {
      console.log('xxxxxEffect:listenForData$:B', x, y);
    })
    .map(([x, y]) => new LoadSuccess({ items: x, userId: y }));
  // .map((items: TodoListsItem[]) => new LoadSuccess({ items, action.payload.userId}));
*/

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  removeItem$ = this.actions$
    .ofType(TodoListsActionTypes.Remove)
    .map((action: Remove) => action.payload)
    .do((payload) => {
      console.log('Effect:removeItem$:A', payload);
      this.dataService.removeItem(payload);
    });

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  save$ = this.actions$
    .ofType(TodoListsActionTypes.Save)
    .map((action: Save) => action.payload)
    .do((payload) => {
      console.log('Effect:save$:A', payload);
      this.dataService.save(payload);
    });
}
