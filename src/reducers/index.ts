import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

// import { storeLogger } from 'ngrx-store-logger';
// import { storeFreeze } from 'ngrx-store-freeze';
// import { localStorageSync } from 'ngrx-store-localstorage';
// import { combineReducers } from '@ngrx/store';

import * as fromLoginReducer from './login.reducer';
import * as fromTodoCompletedReducer from './todo-completed.reducer';
import * as fromTodoReducer from './todo.reducer';
import * as fromTodoListReducer from '../todo-lists/todo-lists.reducer';

export interface State {
  // These property names have to match those in the compose.
  login: fromLoginReducer.State;
  todo: fromTodoReducer.State;
  todoCompleted: fromTodoCompletedReducer.State;
  todoList: fromTodoListReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  login: fromLoginReducer.reducer,
  todo: fromTodoReducer.reducer,
  todoCompleted: fromTodoCompletedReducer.reducer,
  todoList: fromTodoListReducer.reducer,
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
// login
export const getLoginState = (state: State) => state.login;

// tslint:disable-next-line:variable-name
export const getLogin_GetDisplayName = createSelector(
  getLoginState,
  fromLoginReducer.getDisplayName,
);
// tslint:disable-next-line:variable-name
export const getLogin_GetError = createSelector(
  getLoginState,
  fromLoginReducer.getError,
);
// tslint:disable-next-line:variable-name
export const getLogin_GetIsAuthenticated = createSelector(
  getLoginState,
  fromLoginReducer.getIsAuthenticated,
);
// tslint:disable-next-line:variable-name
export const getLogin_GetIsAuthenticating = createSelector(
  getLoginState,
  fromLoginReducer.getIsAuthenticating,
);
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
export const getTodoList_GetTodoLists = createSelector(
  getTodoListState,
  fromTodoListReducer.getTodoLists,
);
