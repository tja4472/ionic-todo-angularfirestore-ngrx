import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import {
    AnonymousAuthenticationFailure,
    CreateUser,
    CreateUserFailure,
    GoogleAuthenticationFailure,
    LoginActionTypes,
    RestoreAuthentication,
} from '../actions/login.action';
import { IState } from '../reducers';

// Do not import from 'firebase' as you'd lose the tree shaking benefits
@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private state$: Store<IState>,
    public af: AngularFireAuth,
  ) { }

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) anonymousAuthentication$ = this.actions$
    .ofType(LoginActionTypes.AnonymousAuthentication)
    .map(() =>
      this.af.auth.signInAnonymously()
        .then((user) => this.state$.dispatch(new RestoreAuthentication({
          displayName: user.auth.displayName,
          email: user.auth.email,
          isAnonymous: user.auth.isAnonymous,
        })))
        .catch((error) => this.state$.dispatch(new AnonymousAuthenticationFailure(error)))
    );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) createUser$ = this.actions$
    .ofType(LoginActionTypes.CreateUser)
    // .do(x => console.log('login.effect:createUser>', x))
    .map((action: CreateUser) => action.payload)
    .map((payload) => {
      this.af.auth.createUserWithEmailAndPassword(
        payload.userName,
        payload.password
      )
        .then((user) => this.state$.dispatch(new RestoreAuthentication({
          displayName: user.auth.displayName,
          email: user.auth.email,
          isAnonymous: user.auth.isAnonymous,
        })))
        .catch((error) => this.state$.dispatch(new CreateUserFailure(error)));
    });

  /*
    @Effect({ dispatch: false }) emailAuthentication$ = this.actions$
      .ofType(LoginActions.EMAIL_AUTHENTICATION)
      // .do(x => console.log('login.effect:emailAuthentication>', x))
      .map((action: LoginActions.EmailAuthenticationAction) => action.payload)
      .map(payload => {
        this.af.auth.signInWithEmailAndPassword(
          payload.userName,
          payload.password
        )
          .then(user => this.state$.dispatch(new LoginActions.RestoreAuthenticationAction({
            displayName: user.auth.displayName,
            email: user.auth.email,
            isAnonymous: user.auth.isAnonymous,
          })))
          .catch(error => {
            console.log('error>', error);
             this.state$.dispatch(new LoginActions.EmailAuthenticationFailureAction(error))
          })

      });
  */

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) authorizeWithGoogle$ = this.actions$
    .ofType(LoginActionTypes.GoogleAuthentication)
    // .do(x => console.log('login.effect:authorizeWithGoogle>', x))
    // .map((action: LoginActions.GoogleAuthenticationAction) => action.payload)
    .map(() => {
      this.af.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      )
        .then((user) => this.state$.dispatch(new RestoreAuthentication({
          displayName: user.auth.displayName,
          email: user.auth.email,
          isAnonymous: user.auth.isAnonymous,
        })))
        .catch((error) => this.state$.dispatch(new GoogleAuthenticationFailure(error)));
    });
}
