import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { TodoListPage } from '../pages/todo-list/todo-list.page';
import { SignInPage } from '../pages/sign-in/sign-in.page';
import { RegisterPage } from '../pages/register/register.page';
import { TodoCompletedListPage } from '../pages/todo-completed-list/todo-completed-list.page';

import { TodoListsPage } from '../todo-lists/pages/todo-lists/todo-lists.page';

import { TodoListsService } from '../todo-lists/services/todo-lists.service';
import {
  map,
  // skip,
  withLatestFrom,
  // merge,
  combineLatest,
  filter,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as FromRoot from '../reducers';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
}

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public displayUserName: string;
  /*
  public viewTodoLists = [
    { value: 'aa', label: 'AA' },
    { value: 'bb', label: 'BB' },
  ];
*/
  public viewTodoListsSelect$: any;

  appPages: PageInterface[] = [
    { title: 'Page One', component: Page1, icon: 'calendar' },
    { title: 'Page Two', component: Page2, icon: 'calendar' },
  ];

  loggedInPages: PageInterface[] = [
    { title: 'Current Todos', component: TodoListPage, icon: 'calendar' },
    {
      component: TodoCompletedListPage,
      icon: 'calendar',
      title: 'Completed Todos',
    },
    { title: 'Todo Lists', component: TodoListsPage, icon: 'calendar' },
    { title: 'Sign Out', component: Page1, icon: 'log-out', logsOut: true },
  ];

  loggedOutPages: PageInterface[] = [
    { title: 'Sign In', component: SignInPage, icon: 'log-in' },
    { title: 'Register', component: RegisterPage, icon: 'person-add' },
  ];

  rootPage: any; // = Page1;
  loginState$: any;

  private readonly CLASS_NAME = 'MyApp';

  private readonly signedInMenuId = 'signedInMenu';
  private readonly signedOutMenuId = 'signedOutMenu';

  constructor(
    private authService: AuthService,
    public menuController: MenuController,
    public platform: Platform,
    public statusBar: StatusBar,
    private store: Store<FromRoot.State>,
    public todoListsService: TodoListsService,
    private userService: UserService,
  ) {
    this.initializeApp();
    /*
    this.store
      .select(FromRoot.getAuthState)
      .pipe(
        // Ignore setting of initial state
        skip(1),
      )
      .subscribe((authState) => {
        console.log('authState>', authState);

        if (authState.isAuthenticated) {
          this.enableMenu(true);
          this.nav.setRoot(TodoListPage).catch(() => {
            console.error('Did not set nav root');
          });

          this.displayUserName = authState.displayName;
        } else {
          this.displayUserName = 'Not signed in';
          this.enableMenu(false);
          this.nav.setRoot(SignInPage).catch(() => {
            console.error('Did not set nav root');
          });
        }
      });
*/
    this.store
      .select(FromRoot.getAuthState)
      .pipe(
        filter((authState) => authState.hasChecked),
        filter((authState) => !authState.isAuthenticated),
      )
      .subscribe((authState) => {
        // Not signed in.
        console.log('Not signed in:authState>', authState);
        this.displayUserName = 'Not signed in';
        this.enableMenu(false);
        this.nav.setRoot(SignInPage).catch(() => {
          console.error('Did not set nav root');
        });
      });

    this.store
      .select(FromRoot.getUser_HasLoaded)
      .pipe(
        filter((hasLoaded) => hasLoaded),
        withLatestFrom(this.store.select(FromRoot.getAuthState)),
        // Ignore setting of initial state
        // skip(1),
      )
      .subscribe(([, authState]) => {
        console.log('Signed in:authState>', authState);

        this.enableMenu(true);
        this.nav.setRoot(TodoListPage).catch(() => {
          console.error('Did not set nav root');
        });

        this.displayUserName = authState.displayName;
      });
    /*
    this.store
      .select(FromRoot.getAuthState)
      .pipe(
        combineLatest(this.store.select(FromRoot.getUserState)),
        // Ignore setting of initial state
        // skip(1),
        filter(([, userState]) => userState.todoListId !== ''),
        //         filter(([,userState]) => userState.isLoaded == true),
      )
      .subscribe(([authState, userState]) => {
        console.log('########authState>', authState);
        console.log('########userState>', userState);

        if (authState.isAuthenticated) {
          this.enableMenu(true);
          this.nav.setRoot(TodoListPage).catch(() => {
            console.error('Did not set nav root');
          });

          this.displayUserName = authState.displayName;
        } else {
          this.displayUserName = 'Not signed in';
          this.enableMenu(false);
          this.nav.setRoot(SignInPage).catch(() => {
            console.error('Did not set nav root');
          });
        }
      });
*/
  }

  public viewtodoListsSelectChange(todoListId: any): void {
    console.log('todoListId>', todoListId);
    this.userService.SetTodoListId(todoListId);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('platform.ready()');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      this.viewTodoListsSelect$ = this.userService.todoListId$().pipe(
        combineLatest(this.todoListsService.getItems$()),
        map(([todoListId, todoLists]) => {
          const ionSelectSource = todoLists.map((item) => ({
            label: item.name,
            selected: item.id === todoListId,
            value: item.id,
          }));
          return ionSelectSource;
        }),
      );

      this.userService.todoListId$().subscribe((x) => {
        console.log('this.userService.todoListId$>', x);
      });
    });
  }

  // Used in view.
  public isActive(page: PageInterface) {
    if (
      this.nav.getActive() &&
      this.nav.getActive().component === page.component
    ) {
      return 'primary';
    }
    return;
  }
  openPage(page: PageInterface) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
    // this.rootPage = page.component;

    if (page.logsOut === true) {
      this.authService.signOut();
    } else {
      this.rootPage = page.component;
    }
  }
  /*
  private doSignedIn(user: SignedInUser): void {
    // this.rootPage = TodoListPage;
    this.enableMenu(true);
    this.nav.setRoot(TodoListPage).catch(() => {
      console.error('Did not set nav root');
    });

    this.displayUserName = user.displayName;
  }

  private doSignedOut(): void {
    // this.rootPage = SignInPage;
    this.displayUserName = 'Not signed in';
    this.enableMenu(false);
    this.nav.setRoot(SignInPage).catch(() => {
      console.error('Did not set nav root');
    });
  }
*/
  private enableMenu(signedIn: boolean): void {
    //
    if (!this.menuController.get(this.signedInMenuId)) {
      console.error(
        `%s:enableMenu() *** WARNING: Menu not found>`,
        this.CLASS_NAME,
        this.signedInMenuId,
      );
    }

    if (!this.menuController.get(this.signedOutMenuId)) {
      console.error(
        `%s:enableMenu() *** WARNING: Menu not found>`,
        this.CLASS_NAME,
        this.signedOutMenuId,
      );
    }

    this.menuController.enable(signedIn, this.signedInMenuId);
    this.menuController.enable(!signedIn, this.signedOutMenuId);
  }
}
