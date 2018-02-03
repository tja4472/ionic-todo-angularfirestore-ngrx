import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { RegisterPage } from '../pages/register/register.page';
import { SignInPage } from '../pages/sign-in/sign-in.page';
import { TodoCompletedListPage } from '../pages/todo-completed-list/todo-completed-list.page';
import { TodoListPage } from '../pages/todo-list/todo-list.page';

import { TodoListsPage } from '../todo-lists/pages/todo-lists/todo-lists.page';
import { TodoListsService } from '../todo-lists/services/todo-lists.service';
import { TodoListsListComponent } from '../todo-lists/components/todo-lists-list/todo-lists-list.component';
import { TodoListsDetailModal } from '../todo-lists/modals/todo-lists-detail/todo-lists-detail.modal';
import { TodoListsDetailComponent } from '../todo-lists/components/todo-lists-detail/todo-lists-detail.component';
import { TodoListsEffects } from '../todo-lists/todo-lists.effect';
import { TodoListsDataService } from '../todo-lists/services/todo-lists.data.service';

import { TodoCompletedDetailModal } from '../modals/todo-completed-detail/todo-completed-detail.modal';
import { TodoDetailModal } from '../modals/todo-detail/todo-detail.modal';

import { Error } from '../components/error/error.component';
import { TodoListPopover } from '../components/todo-list-popover/todo-list.popover';

// shared
import { ControlMessagesComponent } from '../shared/components/control-messages/control-messages.component';
import { CreateUserComponent } from '../shared/components/create-user/create-user.component';
import { SignInComponent } from '../shared/components/sign-in/sign-in.component';
// tslint:disable-next-line:max-line-length
import { TodoCompletedDetailComponent } from '../shared/components/todo-completed-detail/todo-completed-detail.component';
import { TodoCompletedListComponent } from '../shared/components/todo-completed-list/todo-completed-list.component';
import { TodoDetailComponent } from '../shared/components/todo-detail/todo-detail.component';
import { TodoListComponent } from '../shared/components/todo-list/todo-list.component';
import { ValidationService } from '../shared/services/validation.service';

import { Fb1DataService } from '../services/fb1.data.service';
import { LoginService } from '../services/login.service';
import { TodoCompletedDataService } from '../services/todo-completed.data.service';
import { TodoCompletedService } from '../services/todo-completed.service';
import { TodoDataService } from '../services/todo.data.service';
import { TodoService } from '../services/todo.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MY_FIREBASE_APP_CONFIG } from './my-firebase-app-config';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { metaReducers, reducers } from '../reducers/index';

import { LoginEffects } from '../effects/login.effect';
import { TodoCompletedEffects } from '../effects/todo-completed.effect';
import { TodoEffects } from '../effects/todo.effect';

// Add the RxJS Observable operators we need in this app.
// import './rxjs-operators';

@NgModule({
  declarations: [
    CreateUserComponent,
    ControlMessagesComponent,
    Error,
    SignInComponent,
    TodoListPopover,
    TodoDetailComponent,
    TodoListComponent,
    TodoListsListComponent,
    TodoListsDetailModal,
    TodoListsDetailComponent,
    TodoCompletedDetailComponent,
    TodoCompletedListComponent,
    MyApp,
    Page1,
    Page2,
    TodoListPage,
    TodoListsPage,
    SignInPage,
    TodoCompletedDetailModal,
    TodoDetailModal,
    RegisterPage,
    TodoCompletedListPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(MY_FIREBASE_APP_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([
      LoginEffects,
      TodoCompletedEffects,
      TodoEffects,
      TodoListsEffects,
    ]),
  ],
  // tslint:disable-next-line:object-literal-sort-keys
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    TodoListPage,
    TodoListsPage,
    SignInPage,
    TodoCompletedDetailModal,
    TodoDetailModal,
    TodoListsDetailModal,
    RegisterPage,
    TodoCompletedListPage,
    TodoListPopover,
  ],
  providers: [
    Fb1DataService,
    LoginService,
    StatusBar,
    TodoCompletedDataService,
    TodoCompletedService,
    TodoDataService,
    TodoService,
    TodoListsDataService,
    TodoListsService,
    ValidationService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ],
})
export class AppModule {}

/*
so I need some initial state loaded before angular does anything.. for example
the user may already be logged in and I need to load up their user information..
where should I put that code? currently I put it in my services constructor
(where it dispatches the load user action) but I'm hitting auth guards before
the services constructor

AppModule constructor
https://gitter.im/ngrx/store?at=57fe27d14fde7203142e2bb7
*/
