import { Injectable } from '@angular/core';

import { UserDataService } from './user.data.service';

import { Actions, Effect } from '@ngrx/effects';

import { AuthActionTypes, ListenForAuthSuccess } from '../auth/auth.action';
import { LoadItem, LoadItemSuccess, SetTodoListId, UserActionTypes } from './user.action';
import { User } from './user.model';

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
    .map((payload) => new LoadItem({ userId: payload.signedInUser.userId }));

  // tslint:disable-next-line:member-ordering
  @Effect()
  loadItem$ = this.actions$
    .ofType<LoadItem>(UserActionTypes.LOAD_ITEM)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.dataService
        .getItem$(payload.userId)
        .take(1)
        .map((item) => new LoadItemSuccess({ item }));
    });

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  setTodoListId$ = this.actions$
    .ofType<SetTodoListId>(UserActionTypes.SET_TODO_LIST_ID)
    .map((action) => action.payload)
    .do((payload) => {
      const user: User = { todoListId: payload.todoListId };
      this.dataService.save(user, payload.userId);
    });
}
