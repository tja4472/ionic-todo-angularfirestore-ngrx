// tslint:disable:max-classes-per-file
// tslint:disable:no-empty
import { Action } from '@ngrx/store';

import { TaskList } from './task-list.model';

export enum TaskListActionTypes {
  ListenForData = '[TaskList] Listen For Data',
  LoadSuccess = '[TaskList] Load Success',
  Remove = '[TaskList] Remove',
  Save = '[TaskList] Save',
  SetSelectedList = '[TaskList] Set Selected List',
  UnlistenForData = '[TaskList] Unlisten For Data',
}
/*
export const LISTEN_FOR_DATA = '[TaskList] Listen For Data';
export const LOAD_SUCCESS = '[TaskList] Load Success';
export const REMOVE = '[TaskList] Remove';
export const SAVE = '[TaskList] Save';
export const SET_SELECTED_LIST = '[TaskList] Set Selected List';
export const UNLISTEN_FOR_DATA = '[TaskList] Unlisten For Data';
*/
export class ListenForData implements Action {
  readonly type = TaskListActionTypes.ListenForData;

  constructor() {}
}

export class LoadSuccess implements Action {
  readonly type = TaskListActionTypes.LoadSuccess;

  constructor(public payload: TaskList[]) {}
}

export class Remove implements Action {
  readonly type = TaskListActionTypes.Remove;

  constructor(public payload: string) {} // itemKey
}

export class Save implements Action {
  readonly type = TaskListActionTypes.Save;

  constructor(public payload: TaskList) {}
}

export class SetSelectedList implements Action {
  readonly type = TaskListActionTypes.SetSelectedList;

  constructor(public listId: string) {}
}

export class UnlistenForData implements Action {
  readonly type = TaskListActionTypes.UnlistenForData;

  constructor() {}
}

export type TaskListActions =
  | ListenForData
  | LoadSuccess
  | Remove
  | Save
  | SetSelectedList
  | UnlistenForData;
