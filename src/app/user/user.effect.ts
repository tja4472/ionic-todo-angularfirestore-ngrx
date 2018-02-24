import { Injectable } from '@angular/core';

import { UserDataService } from './user.data.service';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { AuthActionTypes, ListenForAuthSuccess } from '../auth/auth.action';
import {
  LoadItem,
  LoadItemSuccess,
  SetTodoListId,
  UserActionTypes,
} from './user.action';
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
  authListenForAuthSuccess$ = this.actions$.pipe(
    ofType<ListenForAuthSuccess>(AuthActionTypes.LISTEN_FOR_AUTH_SUCCESS),
    map((action) => action.payload),
    map((payload) => new LoadItem({ userId: payload.signedInUser.userId })),
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  loadItem$ = this.actions$.pipe(
    ofType<LoadItem>(UserActionTypes.LOAD_ITEM),
    map((action) => action.payload),
    switchMap((payload) => {
      return this.dataService
        .getItem$(payload.userId)
        .pipe(take(1), map((item) => new LoadItemSuccess({ item })));
    }),
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  setTodoListId$ = this.actions$.pipe(
    ofType<SetTodoListId>(UserActionTypes.SET_TODO_LIST_ID),
    map((action) => action.payload),
    tap((payload) => {
      const user: User = { todoListId: payload.todoListId };
      this.dataService.save(user, payload.userId);
    }),
  );
}
