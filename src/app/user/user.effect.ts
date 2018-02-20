import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';

import { AuthActionTypes, ListenForAuthSuccess } from '../auth/auth.action';
import { UserDataService } from './user.data.service';

import {
  DatabaseListenForDataStart,
  DatabaseListenForDataStop,
  UserActionTypes,
  LoadSuccess,
} from './user.action';

import { empty } from 'rxjs/observable/empty';

@Injectable()
export class UserEffects {
  //
  constructor(
    private actions$: Actions,
    private dataService: UserDataService,
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect()
  authListenForAuthSuccess$ = this.actions$
    .ofType<ListenForAuthSuccess>(AuthActionTypes.LISTEN_FOR_AUTH_SUCCESS)
    .map((action) => action.payload)
    .map(
      (payload) =>
        new DatabaseListenForDataStart({ userId: payload.signedInUser.userId }),
    );

  // tslint:disable-next-line:member-ordering
  @Effect()
  listenForData$ = this.actions$
    .ofType<DatabaseListenForDataStart | DatabaseListenForDataStop>(
      UserActionTypes.DATABASE_LISTEN_FOR_DATA_START,
      UserActionTypes.DATABASE_LISTEN_FOR_DATA_STOP,
    )
    .do((x) => {
      console.log('Effect:listenForData$:A', x);
    })
    .switchMap((action) => {
      console.log('Effect:listenForData$:action>', action);

      if (action.type === UserActionTypes.DATABASE_LISTEN_FOR_DATA_STOP) {
        console.log('TodoAction.UNLISTEN_FOR_DATA');
        return empty();
      } else {
        return this.dataService
          .getItem$(action.payload.userId)
          .take(1)
          .map((item) => new LoadSuccess({ item }));
      }
    })
    .do((x) => {
      console.log('xxxxxEffect:listenForData$:B', x);
    });
}
