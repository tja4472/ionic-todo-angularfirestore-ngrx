// tslint:disable:max-classes-per-file
// tslint:disable:no-empty
import { Action } from '@ngrx/store';

import { IReorderArrayIndexes } from '../shared/models/reorder-array-indexes.model';
import { Todo } from '../shared/models/todo.model';

export enum TodoActionTypes {
  ClearCompleted = '[TodoActions] Clear Completed',
  ListenForData = '[TodoActions] Listen For Data',
  LoadSuccess = '[TodoActions] Load Success',
  ReorderList = '[TodoActions] Reorder List',
  Remove = '[TodoActions] Remove',
  Save = '[TodoActions] Save',
  UnlistenForData = '[TodoActions] Unlisten For Data',
}
/*
export const CLEAR_COMPLETED = '[TodoActions] Clear Completed';
export const LISTEN_FOR_DATA = '[TodoActions] Listen For Data';
export const LOAD_SUCCESS = '[TodoActions] Load Success';
export const REORDER_LIST = '[TodoActions] Reorder List';
export const REMOVE = '[TodoActions] Remove';
export const SAVE = '[TodoActions] Save';
export const UNLISTEN_FOR_DATA = '[TodoActions] Unlisten For Data';
*/

export class ClearCompleted implements Action {
  readonly type = TodoActionTypes.ClearCompleted;

  constructor() {}
}

export class ListenForData implements Action {
  readonly type = TodoActionTypes.ListenForData;

  constructor() {}
}

export class LoadSuccess implements Action {
  readonly type = TodoActionTypes.LoadSuccess;

  constructor(public payload: Todo[]) {}
}

export class Remove implements Action {
  readonly type = TodoActionTypes.Remove;

  constructor(public payload: string) {} // itemKey
}

export class ReorderList implements Action {
  readonly type = TodoActionTypes.ReorderList;

  constructor(public payload: IReorderArrayIndexes) {}
}

export class Save implements Action {
  readonly type = TodoActionTypes.Save;

  constructor(public payload: Todo) {}
}

export class UnlistenForData implements Action {
  readonly type = TodoActionTypes.UnlistenForData;

  constructor() {}
}

export type TodoActions =
  | ClearCompleted
  | ListenForData
  | LoadSuccess
  | Remove
  | ReorderList
  | Save
  | UnlistenForData;
