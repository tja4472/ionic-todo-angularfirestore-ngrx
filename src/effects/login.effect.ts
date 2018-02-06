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
import { State } from '../reducers';

// Do not import from 'firebase' as you'd lose the tree shaking benefits
@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private state$: Store<State>,
    public auth$: AngularFireAuth,
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  logActions$ = this.actions$
    .ofType('@ngrx/effects/init')
    .do((action) => {
      console.log('logActions$', action);
    })
    .switchMap(() => this.auth$.authState)
    .map((aa) => {
      if (aa) {
        console.log('aaaaaa>', aa);
      } else {
        console.log('bbbbbb>', aa);
      }
    })
    .do((xx) => console.log('xx>', xx));

  /*
    @Effect() checkAuth$ = this.action$.ofType(actions.CHECK_AUTH)
        .do((action) => console.log(`Received ${action.type}`))
        .switchMap(() => this.auth$.authState)
        .map((_result) => {
            debugger
            if (_result) {
                console.log("in auth subscribe", _result)
                return { type: actions.CHECK_AUTH_SUCCESS, payload: _result }
            } else {
                console.log("in auth subscribe - no user", _result)
                return { type: actions.CHECK_AUTH_NO_USER, payload: null }
            }

        }).catch((res: any) => Observable.of({ type: actions.CHECK_AUTH_FAILED, payload: res }))
  */

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  anonymousAuthentication$ = this.actions$
    .ofType(LoginActionTypes.AnonymousAuthentication)
    .map(() =>
      this.auth$.auth
        .signInAnonymously()
        .then((user) =>
          this.state$.dispatch(
            new RestoreAuthentication({
              displayName: user.auth.displayName,
              email: user.auth.email,
              isAnonymous: user.auth.isAnonymous,
            }),
          ),
        )
        .catch((error) =>
          this.state$.dispatch(new AnonymousAuthenticationFailure(error)),
        ),
    );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  createUser$ = this.actions$
    .ofType(LoginActionTypes.CreateUser)
    // .do(x => console.log('login.effect:createUser>', x))
    .map((action: CreateUser) => action.payload)
    .map((payload) => {
      this.auth$.auth
        .createUserWithEmailAndPassword(payload.userName, payload.password)
        .then((user) =>
          this.state$.dispatch(
            new RestoreAuthentication({
              displayName: user.auth.displayName,
              email: user.auth.email,
              isAnonymous: user.auth.isAnonymous,
            }),
          ),
        )
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
  @Effect({ dispatch: false })
  authorizeWithGoogle$ = this.actions$
    .ofType(LoginActionTypes.GoogleAuthentication)
    // .do(x => console.log('login.effect:authorizeWithGoogle>', x))
    // .map((action: LoginActions.GoogleAuthenticationAction) => action.payload)
    .map(() => {
      this.auth$.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((user) =>
          this.state$.dispatch(
            new RestoreAuthentication({
              displayName: user.auth.displayName,
              email: user.auth.email,
              isAnonymous: user.auth.isAnonymous,
            }),
          ),
        )
        .catch((error) =>
          this.state$.dispatch(new GoogleAuthenticationFailure(error)),
        );
    });
}
