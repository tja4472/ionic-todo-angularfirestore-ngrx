import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromAuth from '../app/auth/auth.reducer';
import * as fromTodoListReducer from '../todo-lists/todo-lists.reducer';
import * as fromTodoCompletedReducer from './todo-completed.reducer';
import * as fromTodoReducer from './todo.reducer';
import * as fromUserReducer from '../app/user/user.reducer';

// import { storeLogger } from 'ngrx-store-logger';
// import { storeFreeze } from 'ngrx-store-freeze';
// import { localStorageSync } from 'ngrx-store-localstorage';
// import { combineReducers } from '@ngrx/store';

export interface State {
  // These property names have to match those in the compose.
  auth: fromAuth.AuthState;
  todo: fromTodoReducer.State;
  todoCompleted: fromTodoCompletedReducer.State;
  todoList: fromTodoListReducer.State;
  user: fromUserReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  todo: fromTodoReducer.reducer,
  todoCompleted: fromTodoCompletedReducer.reducer,
  todoList: fromTodoListReducer.reducer,
  user: fromUserReducer.reducer,
};

export const metaReducers: Array<MetaReducer<State>> = [storeFreeze];

/*
const developmentReducer: ActionReducer<State> = compose(
    localStorageSync(['todo'], true),
    storeFreeze,
    storeLogger(),
    combineReducers)(reducers);

export function reducer(state: any, action: any) {
    return developmentReducer(state, action);
}
*/

/***********
 * Selectors
 ***********/
//
// todo
export const getTodoState = (state: State) => state.todo;

// tslint:disable-next-line:variable-name
export const getTodo_GetLoaded = createSelector(
  getTodoState,
  fromTodoReducer.getLoaded,
);
// tslint:disable-next-line:variable-name
export const getTodo_GetLoading = createSelector(
  getTodoState,
  fromTodoReducer.getLoading,
);
// tslint:disable-next-line:variable-name
export const getTodo_GetTodos = createSelector(
  getTodoState,
  fromTodoReducer.getTodos,
);
//
// todoCompleted
export const getTodoCompletedState = (state: State) => state.todoCompleted;

// tslint:disable-next-line:variable-name
export const getTodoCompleted_GetLoaded = createSelector(
  getTodoCompletedState,
  fromTodoCompletedReducer.getLoaded,
);
// tslint:disable-next-line:variable-name
export const getTodoCompleted_GetLoading = createSelector(
  getTodoCompletedState,
  fromTodoCompletedReducer.getLoaded,
);
// tslint:disable-next-line:variable-name
export const getTodoCompleted_GetTodoCompletedList = createSelector(
  getTodoCompletedState,
  fromTodoCompletedReducer.getTodoCompletedList,
);
// todoList
export const getTodoListState = (state: State) => state.todoList;

// tslint:disable-next-line:variable-name
export const getTodoList_GetLoaded = createSelector(
  getTodoListState,
  fromTodoListReducer.getLoaded,
);
// tslint:disable-next-line:variable-name
export const getTodoList_GetLoading = createSelector(
  getTodoListState,
  fromTodoListReducer.getLoading,
);
// tslint:disable-next-line:variable-name
export const getTodoList_GetSelectedListId = createSelector(
  getTodoListState,
  fromTodoListReducer.getSelectedListId,
);
// tslint:disable-next-line:variable-name
export const getTodoList_GetTodoLists = createSelector(
  getTodoListState,
  fromTodoListReducer.getTodoLists,
);
//#region User selectors
export const getUserState = (state: State) => state.user;


// tslint:disable-next-line:variable-name
export const getUser_HasLoaded = createSelector(
  getUserState,
  fromUserReducer.getHasLoaded,
);

// tslint:disable-next-line:variable-name
export const getUser_TodoListId = createSelector(
  getUserState,
  fromUserReducer.getTodoListId,
);
//#endregion
