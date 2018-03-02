import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';

import { EmailAuthentication } from '../../app/auth/auth.action';
import * as FromAuthSelector from '../../app/auth/auth.selector';
import * as FromRoot from '../../reducers';
import { SignInComponentResult } from '../../shared/components/sign-in/sign-in.component';
import { RegisterPage } from '../register/register.page';

// import { AuthService } from '../../app/auth/auth.service';
// changeDetection: ChangeDetectionStrategy.OnPush,
@Component({
  selector: 'tja-page-sign-in',
  templateUrl: 'sign-in.page.html',
})
export class SignInPage {
  // Used in view
  public viewError$: any;

  private readonly CLASS_NAME = 'SignInPage';

  constructor(public nav: NavController, private store: Store<FromRoot.State>) {
    console.log('%s:constructor', this.CLASS_NAME);
    this.viewError$ = this.store.select(FromAuthSelector.getError);
  }

  public ionViewDidLeave() {
    console.log('###%s:ionViewDidLeave', this.CLASS_NAME);
    // this.loginService.clearError$();
  }

  public viewRegister(): void {
    console.log('viewRegister>');
    // Should be root.
    this.nav.setRoot(RegisterPage);
  }

  public viewSignIn(x: SignInComponentResult): void {
    //
    // console.log('viewSignIn>', x);
    // this.loginService.emailAuthentication(x.email, x.password);
    // this.authService.signInWithEmailAndPassword(x.email, x.password);
    this.store.dispatch(
      new EmailAuthentication({
        password: x.password,
        userName: x.email,
      }),
    );
  }
}
