import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest, filter, take } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import {
  DatabaseListenForDataStart,
  DatabaseListenForDataStop,
  DeleteItem,
  MoveToCurrent,
  UpsertItem,
} from '../actions/todo-completed.action';
import * as FromAuthSelector from '../app/auth/auth.selector';
import * as FromRootReducer from '../reducers';
import { TodoCompleted } from '../shared/models/todo-completed.model';

// import * as TodoCompletedActions from '../actions/todo-completed.action';
@Injectable()
export class TodoCompletedService {
  //
  private listenForDataStartSubscription: Subscription;

  private init$ = this.store.pipe(
    select(FromAuthSelector.getUserId),
    combineLatest(this.store.pipe(select(FromRootReducer.getUser_TodoListId))),
    filter(([userId]) => userId !== ''),
  );

  constructor(private store: Store<FromRootReducer.State>) {}

  getData$(): Observable<ReadonlyArray<TodoCompleted>> {
    //
    return this.store.pipe(
      select(FromRootReducer.getTodoCompleted_GetTodoCompletedList),
    );
  }

  public ListenForDataStart(): void {
    //
    this.listenForDataStartSubscription = this.init$.subscribe(
      ([userId, todoListId]) => {
        this.store.dispatch(
          new DatabaseListenForDataStart({
            todoListId,
            userId,
          }),
        );
      },
    );
  }

  public ListenForDataStop(): void {
    //
    this.listenForDataStartSubscription.unsubscribe();
    this.store.dispatch(new DatabaseListenForDataStop());
  }

  hasLoaded$(): Observable<boolean> {
    //
    return this.store.pipe(select(FromRootReducer.getTodoCompleted_GetLoaded));
  }

  isLoading$(): Observable<boolean> {
    //
    return this.store.pipe(select(FromRootReducer.getTodoCompleted_GetLoading));
  }

  moveToCurrent(item: TodoCompleted) {
    //
    this.init$.pipe(take(1)).subscribe(([userId, todoListId]) => {
      this.store.dispatch(
        new MoveToCurrent({
          item,
          todoListId,
          userId,
        }),
      );
    });
  }

  public deleteItem(item: TodoCompleted) {
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

  public upsertItem(item: TodoCompleted) {
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
}
