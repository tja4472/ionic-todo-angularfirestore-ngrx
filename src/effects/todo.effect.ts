import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { empty } from 'rxjs/observable/empty';

import {
  LoadSuccess,
  Remove,
  ReorderList,
  Save,
  TodoActionTypes,
} from '../actions/todo.action';

import * as FromRootReducer from '../reducers';
import { Fb1DataService } from '../services/fb1.data.service';
import { TodoDataService } from '../services/todo.data.service';
import { Todo } from '../shared/models/todo.model';

// import { of } from 'rxjs/observable/of';
// import * as TodoAction from '../actions/todo.action';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private state$: Store<FromRootReducer.IState>,
    private fb1DataService: Fb1DataService,
    private todoDataService: TodoDataService
  ) { }

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) clearCompleted$ = this.actions$
    .ofType(TodoActionTypes.ClearCompleted)
    .withLatestFrom(this.state$)
    .do(([, state]) => {
      const completed = state.todo.todos.filter((a) => a.isComplete);
      this.fb1DataService.clearCompletedTodos(completed);
    });
  /*
    @Effect() clearCompleted$ = this.updates$
      .whenAction(ToDoActions.CLEAR_COMPLETED)
      .do(x => {
        let completed = x.state.todo.todos.filter(a => a.isComplete);
        this.fb1DataService.clearCompletedTodos(completed);
      })
      // Terminate effect.
      .ignoreElements();
  */

  // tslint:disable-next-line:member-ordering
  @Effect() listenForData$ = this.actions$
    .ofType(TodoActionTypes.ListenForData,
    TodoActionTypes.UnlistenForData)
    .do((x) => { console.log('Effect:listenForData$:A', x); })
    .withLatestFrom(this.state$)
    // tslint:disable-next-line:no-unused-variable
    // .filter(([, state]) => state.login.isAuthenticated)
    // Watch database node and get items.
    .switchMap(([action]) => {
      console.log('Effect:listenForData$:action>', action);

      if (action.type === TodoActionTypes.UnlistenForData) {
        console.log('TodoAction.UNLISTEN_FOR_DATA');
        return empty();
      } else {
        return this.todoDataService.getData();
      }
    })
    .do((x) => { console.log('Effect:listenForData$:B', x); })
    .map((items: Todo[]) => new LoadSuccess(items));


  /*
    @Effect() loadCollection$ = this.updates$
      .whenAction(ToDoActions.LOAD)
      .do(x => { console.log('Effect:loadCollection$:A', x); })
      .filter(x => x.state.login.isAuthenticated)

      // Watch database node and get items.
      .switchMap(x => this.todoDataService.getData())
      .do(x => { console.log('Effect:loadCollection$:B', x); })
      .map((items: ToDo[]) => this.todoActions.loadSuccess(items));
    // Terminate effect.
    // .ignoreElements());
  */
  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) reorderList$ = this.actions$
    .ofType(TodoActionTypes.ReorderList)
    .withLatestFrom(this.state$)
    .map(([action, state]) => ({ action: action as ReorderList, state }))
    .do((x) => {
      console.log('Effect:reorderList$:A', x);
      this.todoDataService.reorderItemsAndUpdate(
        x.action.payload,
        x.state.todo.todos);
    });
  /*
    @Effect() reorderList$ = this.updates$
      .whenAction(ToDoActions.REORDER_LIST)
      .do(x => {
        console.log('Effect:reorderList$:A', x);
        this.todoDataService.reorderItemsAndUpdate(
          x.action.payload.indexes,
          x.state.todo.todos);
      })

      // Terminate effect.
      .ignoreElements();
  */

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) removeItem$ = this.actions$
    .ofType(TodoActionTypes.Remove)
    .map((action: Remove) => action.payload)
    .do((payload) => {
      console.log('Effect:removeItem$:A', payload);
      this.todoDataService.removeItem(payload);
    });

  /*
    @Effect() removeItem$ = this.updates$
      .whenAction(ToDoActions.REMOVE)
      .do(x => {
        console.log('Effect:removeItem$:A', x);
        this.todoDataService.removeItem(
          x.action.payload);
      })

      // Terminate effect.
      .ignoreElements();
  */
  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) save$ = this.actions$
    .ofType(TodoActionTypes.Save)
    .map((action: Save) => action.payload)
    .do((payload) => {
      console.log('Effect:save$:A', payload);
      this.todoDataService.save(payload);
    });
  /*
    @Effect() save$ = this.updates$
      .whenAction(ToDoActions.SAVE)
      .do(x => {
        console.log('Effect:save$:A', x);
        this.todoDataService.save(
          x.action.payload);
      })

      // Terminate effect.
      .ignoreElements();
  }
  */
}
