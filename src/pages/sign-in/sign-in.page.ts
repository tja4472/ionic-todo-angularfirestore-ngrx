import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { RegisterPage } from '../register/register.page';

import { SignInComponentResult } from '../../shared/components/sign-in/sign-in.component';
import { AuthService } from '../../app/auth/auth.service';

// changeDetection: ChangeDetectionStrategy.OnPush,

@Component({
  selector: 'tja-page-sign-in',
  templateUrl: 'sign-in.page.html',
})
export class SignInPage {
  // Used in view
  public viewError$: any;

  private readonly CLASS_NAME = 'SignInPage';

  constructor(private authService: AuthService, public nav: NavController) {
    console.log('%s:constructor', this.CLASS_NAME);
    // this.viewError$ = loginService.error$();
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
    console.log('viewSignIn>', x);
    // this.loginService.emailAuthentication(x.email, x.password);
    this.authService.signInWithEmailAndPassword(x.email, x.password);
  }
}
