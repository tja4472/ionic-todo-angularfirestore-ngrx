import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest, filter } from 'rxjs/operators';
import { take } from 'rxjs/operators/take';
import { Subscription } from 'rxjs/Subscription';

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
  private listenForDataStartSubscription: Subscription;

  private init$ = this.store.pipe(
    select(FromRootReducer.getAuthUserId),
    combineLatest(this.store.pipe(select(FromRootReducer.getUser_TodoListId))),
    filter(([userId]) => userId !== ''),
  );

  constructor(private store: Store<FromRootReducer.State>) {}

  clearCompletedItems() {
    //
    this.init$.pipe(take(1)).subscribe(([userId, todoListId]) => {
      this.store.dispatch(
        new ClearCompleted({
          todoListId,
          userId,
        }),
      );
    });
  }

  getData$(): Observable<Todo[]> {
    //
    return this.store.pipe(select(FromRootReducer.getTodo_GetTodos));
  }

  public ListenForDataStart(): void {
    //
    this.listenForDataStartSubscription = this.init$
      .subscribe(([userId, todoListId]) => {
        this.store.dispatch(
          new DatabaseListenForDataStart({
            todoListId,
            userId,
          }),
        );
      });
  }

  public ListenForDataStop(): void {
    //
    this.listenForDataStartSubscription.unsubscribe();
    this.store.dispatch(new DatabaseListenForDataStop());
  }

  hasLoaded$(): Observable<boolean> {
    //
    return this.store.pipe(select(FromRootReducer.getTodo_GetLoaded));
  }

  isLoading$(): Observable<boolean> {
    //
    return this.store.pipe(select(FromRootReducer.getTodo_GetLoading));
  }

  public reorderItems(indexes: ReorderArrayIndexes) {
    //
    this.init$.pipe(take(1)).subscribe(([userId, todoListId]) => {
      this.store.dispatch(
        new ReorderList({
          indexes,
          todoListId,
          userId,
        }),
      );
    });
  }

  public deleteItem(item: Todo) {
    //
    this.init$.pipe(take(1)).subscribe(([userId, todoListId]) => {
      this.store.dispatch(
        new DeleteItem({
          itemId: item.id,
          todoListId,
          userId,
        }),
      );
    });
  }

  public upsertItem(item: Todo) {
    //
    this.init$.pipe(take(1)).subscribe(([userId, todoListId]) => {
      this.store.dispatch(
        new UpsertItem({
          item,
          todoListId,
          userId,
        }),
      );
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
