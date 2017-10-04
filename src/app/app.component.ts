
import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { TodoListPage } from '../pages/todo-list/todo-list.page';
import { SignInPage } from '../pages/sign-in/sign-in.page';
import { RegisterPage } from '../pages/register/register.page';
import { TodoCompletedListPage } from '../pages/todo-completed-list/todo-completed-list.page';

import { LoginService } from '../services/login.service';

import { SignedInUser } from '../models/signed-in-user.model';

export interface IPageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public displayUserName: string;

  appPages: IPageInterface[] = [
    { title: 'Page One', component: Page1, icon: 'calendar' },
    { title: 'Page Two', component: Page2, icon: 'calendar' },
  ];

  loggedInPages: IPageInterface[] = [
    { title: 'Current Todos', component: TodoListPage, icon: 'calendar' },
    { title: 'Completed Todos', component: TodoCompletedListPage, icon: 'calendar' },
    { title: 'Sign Out', component: Page1, icon: 'log-out', logsOut: true }
  ];

  loggedOutPages: IPageInterface[] = [
    { title: 'Sign In', component: SignInPage, icon: 'log-in' },
    { title: 'Register', component: RegisterPage, icon: 'person-add' },
  ];



  rootPage: any; // = Page1;
  loginState$: any;
  pages: IPageInterface[];

  private readonly CLASS_NAME = 'MyApp';

  private signedInUser: SignedInUser | null = null;

  constructor(
    private loginService: LoginService,
    public menu: MenuController,
    public platform: Platform,
    public statusBar: StatusBar,
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page One', component: Page1, icon: 'calendar' },
      { title: 'Page Two', component: Page2, icon: 'calendar' },
      { title: 'Current todos', component: TodoListPage, icon: 'calendar' },
      { title: 'Completed todos', component: TodoCompletedListPage, icon: 'calendar' },
      { title: 'Sign In', component: SignInPage, icon: 'log-in' },
      { title: 'Register', component: RegisterPage, icon: 'person-add' },
      { title: 'Sign Out', component: SignInPage, logsOut: true, icon: 'log-out' },
    ];

    // loginService.initialise();

    this.loginState$ = loginService.getLoginState();

    /*
        loginService.getLoginState()
          .subscribe(loginState => {
            console.log('loginState>', loginState);
            console.log('loginState.isAuthenticated>', loginState.isAuthenticated);
            console.log('loginState.isAuthenticating>', loginState.isAuthenticating);

            if (loginState.isAuthenticating) {
              // this.rootPage = Page1;
            } else if (loginState.isAuthenticated) {
              this.rootPage = HomePage;
            } else {
              this.rootPage = LoginPage;
            }
          });
    */
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('platform.ready()');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      this.loginService.notifier$.subscribe((signedInUser: SignedInUser) => {
        console.log('>>>>>>>>>>signedInUser>', signedInUser);
        this.signedInUser = signedInUser;

        if (signedInUser) {
          this.doSignedIn(signedInUser);
        } else {
          this.doSignedOut();
        }
      });

/*
      this.loginService.auth$.subscribe((firebaseUser) => {
        console.log('>>>>>>>>>>firebaseUser>', firebaseUser);

                      if (firebaseUser) {
                        this.doSignedIn();
                        // this.rootPage = TodoListPage;
                      } else {
                        this.doSignedOut();
                        // this.rootPage = SignInPage;
                      }
      });
*/
      /*
      this.loginService.getLoginState()
        .subscribe((loginState) => {
          console.log('loginState>', loginState);
          console.log('loginState.isAuthenticated>', loginState.isAuthenticated);
          console.log('loginState.isAuthenticating>', loginState.isAuthenticating);

          if (loginState.isAuthenticating) {
            // this.rootPage = Page1;
          } else if (loginState.isAuthenticated) {
            // this.rootPage = HomePage;
          } else {
            // this.rootPage = LoginPage;
          }
        });
      */
    });

  }

  // Used in view.
  public isActive(page: IPageInterface) {
    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return 'primary';
    }
    return;
  }
  openPage(page: IPageInterface) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.loginService.logout();
      }, 1000);
    }
  }

  private doSignedIn(user: SignedInUser): void {
    // this.rootPage = TodoListPage;
    this.enableMenu(true);
    this.nav.setRoot(TodoListPage).catch(() => {
      console.error('Didn\'t set nav root');
    });


    this.displayUserName = user.displayName;
  }

  private doSignedOut(): void {
    // this.rootPage = SignInPage;
    this.displayUserName = 'Not signed in';
    this.enableMenu(false);
    this.nav.setRoot(SignInPage).catch(() => {
      console.error('Didn\'t set nav root');
    });
  }

  private enableMenu(loggedIn: boolean): void {
    const loggedInMenu = 'loggedInMenu';
    const loggedOutMenu = 'loggedOutMenu';

    if (!this.menu.get(loggedInMenu)) {
      console.error(`%s:enableMenu() *** WARNING: Menu not found>`, this.CLASS_NAME, loggedInMenu);
    }

    if (!this.menu.get(loggedOutMenu)) {
      console.error(`%s:enableMenu() *** WARNING: Menu not found>`, this.CLASS_NAME, loggedOutMenu);
    }

    this.menu.enable(loggedIn, loggedInMenu);
    this.menu.enable(!loggedIn, loggedOutMenu);
  }
}
