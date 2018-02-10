// tslint:disable:max-classes-per-file
// tslint:disable:no-empty
import { Action } from '@ngrx/store';

import { TodoCompleted } from '../shared/models/todo-completed.model';

export enum TodoCompletedActionTypes {
  DATABASE_LISTEN_FOR_DATA_START = '[TodoCompleted] (Database) Listen For Data - Start',
  DATABASE_LISTEN_FOR_DATA_STOP = '[TodoCompleted] (Database) Listen For Data - Stop',
  DELETE_ITEM = '[TodoCompleted] Delete Item',
  LoadSuccess = '[TodoCompleted] Load Success',
  MoveToCurrent = '[TodoCompleted] Move To Current',
  UPSERT_ITEM = '[TodoCompleted] Upsert item',
}

export class DatabaseListenForDataStart implements Action {
  readonly type = TodoCompletedActionTypes.DATABASE_LISTEN_FOR_DATA_START;

  constructor(
    public payload: {
      todoListId: string;
      userId: string;
    },
  ) {}
}

export class DatabaseListenForDataStop implements Action {
  readonly type = TodoCompletedActionTypes.DATABASE_LISTEN_FOR_DATA_STOP;

  constructor() {}
}

export class DeleteItem implements Action {
  readonly type = TodoCompletedActionTypes.DELETE_ITEM;

  constructor(
    public payload: {
      itemId: string;
      todoListId: string;
      userId: string;
    },
  ) {}
}

export class LoadSuccess implements Action {
  readonly type = TodoCompletedActionTypes.LoadSuccess;

  constructor(public payload: TodoCompleted[]) {}
}

export class MoveToCurrent implements Action {
  readonly type = TodoCompletedActionTypes.MoveToCurrent;

  constructor(
    public payload: {
      item: TodoCompleted;
      todoListId: string;
      userId: string;
    },
  ) {}
}

export class UpsertItem implements Action {
  readonly type = TodoCompletedActionTypes.UPSERT_ITEM;

  constructor(
    public payload: {
      item: TodoCompleted;
      todoListId: string;
      userId: string;
    },
  ) {}
}

export type TodoCompletedActions =
  | DatabaseListenForDataStart
  | DatabaseListenForDataStop
  | LoadSuccess
  | MoveToCurrent
  | DeleteItem
  | UpsertItem;
