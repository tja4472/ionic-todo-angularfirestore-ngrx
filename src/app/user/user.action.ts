// tslint:disable:max-classes-per-file
// tslint:disable:no-empty
import { Action } from '@ngrx/store';
import { User } from './user.model';

export enum UserActionTypes {
  DATABASE_LISTEN_FOR_DATA_START = '[User] (Database) Listen For Data - Start',
  DATABASE_LISTEN_FOR_DATA_STOP = '[User] (Database) Listen For Data - Stop',
  LOAD_SUCCESS = '[User] Load Success',
  SET_TODO_LIST_ID = '[User] Set TodoListId',
  UPSERT_ITEM = '[User] Upsert item',
}

export class DatabaseListenForDataStart implements Action {
  readonly type = UserActionTypes.DATABASE_LISTEN_FOR_DATA_START;

  constructor(
    public payload: {
      userId: string;
    },
  ) {}
}

export class DatabaseListenForDataStop implements Action {
  readonly type = UserActionTypes.DATABASE_LISTEN_FOR_DATA_STOP;

  constructor() {}
}

export class LoadSuccess implements Action {
  readonly type = UserActionTypes.LOAD_SUCCESS;

  constructor(public payload: { item: User | null }) {}
}

export class SetTodoListId implements Action {
  readonly type = UserActionTypes.SET_TODO_LIST_ID;

  constructor(
    public payload: {
      todoListId: string;
    },
  ) {}
}

export class UpsertItem implements Action {
  readonly type = UserActionTypes.UPSERT_ITEM;

  constructor(
    public payload: {
      item: User;
      userId: string;
    },
  ) {}
}

export type UserActions =
  | DatabaseListenForDataStart
  | DatabaseListenForDataStop
  | LoadSuccess
  | SetTodoListId
  | UpsertItem;
