import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators/take';

import {
  ClearCompleted,
  DatabaseListenForDataStart,
  DatabaseListenForDataStop,
  DeleteItem,
  ReorderList,
  UpsertItem,
} from '../actions/todo.action';
import * as FromRootReducer from '../reducers';
import { ReorderArrayIndexes } from '../shared/models/reorder-array-indexes.model';
import { Todo } from '../shared/models/todo.model';

@Injectable()
export class TodoService {
  //
  constructor(private store: Store<FromRootReducer.State>) {}

  clearCompletedItems() {
    //
    this.store
      .select(FromRootReducer.getAuthState)
      .pipe(take(1))
      .subscribe((state) => {
        if (state.isAuthenticated) {
          this.store.dispatch(
            new ClearCompleted({
              todoListId: state.todoListId,
              userId: state.userId,
            }),
          );
        }
      });
  }

  getData$(): Observable<Todo[]> {
    return this.store.select(FromRootReducer.getTodo_GetTodos);
  }

  public ListenForDataStart(): void {
    //
    this.store
      .select(FromRootReducer.getAuthState)
      // .combineLatest(this.store.select((state) => state.user))
      // .withLatestFrom(this.store.select((state) => state.user))
      // .filter(([, userState]) => userState.todoListId !== '')
      // .take(1)
      .do(() => console.log('#############################'))
      // .pipe(withLatestFrom(this.store.select(state => state.user)))
      // take(1))
      .subscribe((authState) => {
        if (authState.todoListId === '') {
          return;
        }

        if (authState.isAuthenticated) {
          this.store.dispatch(
            new DatabaseListenForDataStart({
              todoListId: authState.todoListId,
              userId: authState.userId,
            }),
          );
        }
      });
  }

  public ListenForDataStop(): void {
    this.store.dispatch(new DatabaseListenForDataStop());
    // this.sub.unsubscribe();
  }

  isLoaded(): Observable<boolean> {
    return this.store.select(FromRootReducer.getTodo_GetLoaded);
  }

  isLoading(): Observable<boolean> {
    return this.store.select(FromRootReducer.getTodo_GetLoading);
  }

  public reorderItems(indexes: ReorderArrayIndexes) {
    //
    this.store
      .select(FromRootReducer.getAuthState)
      .withLatestFrom(this.store.select((state) => state.user))
      .pipe(take(1))
      .subscribe(([authState, userState]) => {
        if (authState.isAuthenticated) {
          this.store.dispatch(
            new ReorderList({
              indexes,
              todoListId: userState.todoListId,
              userId: authState.userId,
            }),
          );
        }
      });
  }

  public deleteItem(item: Todo) {
    //
    this.store
      .select(FromRootReducer.getAuthState)
      .withLatestFrom(this.store.select((state) => state.user))
      .pipe(take(1))
      .subscribe(([authState, userState]) => {
        if (authState.isAuthenticated) {
          this.store.dispatch(
            new DeleteItem({
              itemId: item.id,
              todoListId: userState.todoListId,
              userId: authState.userId,
            }),
          );
        }
      });
  }

  public upsertItem(item: Todo) {
    //
    this.store
      .select(FromRootReducer.getAuthState)
      .withLatestFrom(this.store.select((state) => state.user))
      .pipe(take(1))
      .subscribe(([authState, userState]) => {
        if (authState.isAuthenticated) {
          this.store.dispatch(
            new UpsertItem({
              item,
              todoListId: userState.todoListId,
              userId: authState.userId,
            }),
          );
        }
      });
  }
  /********************************
   * https://medium.com/@m3po22/stop-using-ngrx-effects-for-that-a6ccfe186399
   *******************************/
  /*
    getData$(): Observable<Todo[]> {
    // return this.store.select(FromRootReducer.getTodo_GetTodos);
    return this.items$;
  }

  public muteFirst = <T,R>(first$: Observable<T>, second$: Observable<R>) => Observable.combineLatest(
    first$,
    second$,
    (_a,b) => b
  ).distinctUntilChanged()

  // tslint:disable-next-line:member-ordering
  public requireItems$ = this.store
    .select(FromRootReducer.getAuthState)
    .filter((authState) => authState.isAuthenticated)
    .combineLatest(this.store.select(FromRootReducer.getUser_TodoListId))
    .filter(([, todoListId]) => todoListId !== '')
    .do(() => this.store.dispatch({ type: 'GET_USERS' }))
    .switchMap(([authState, todoListId]) => {
      console.log('##switchMap##:authState>', authState);
      console.log('##switchMap##:todoListId>', todoListId);

      return this.dataService.getData(todoListId, authState.userId);
    }
    )
    .do((items) => this.store.dispatch(new LoadSuccess(items)))
    .finally(() => {
      console.log('##finally##');
      this.store.dispatch({ type: 'CANCEL_GET_USERS' });
  })
    .share();

  // tslint:disable-next-line:member-ordering
  public items$ = this.muteFirst(
    this.requireItems$.startWith(null),
    this.store.select(FromRootReducer.getTodo_GetTodos));

  */
}
