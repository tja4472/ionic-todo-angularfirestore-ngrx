// tslint:disable:max-classes-per-file
// tslint:disable:no-empty
import { Action } from '@ngrx/store';
import { User } from './user.model';

export enum UserActionTypes {
  DATABASE_LISTEN_FOR_DATA_STOP = '[User] (Database) Listen For Data - Stop',
  LOAD_ITEM = '[User] Load Item',
  LOAD_ITEM_SUCCESS = '[User] Load Item Success',
  SET_TODO_LIST_ID = '[User] Set TodoListId',
  UPSERT_ITEM = '[User] Upsert item',
}

export class LoadItem implements Action {
  readonly type = UserActionTypes.LOAD_ITEM;

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

export class LoadItemSuccess implements Action {
  readonly type = UserActionTypes.LOAD_ITEM_SUCCESS;

  constructor(public payload: { item: User | null }) {}
}

export class SetTodoListId implements Action {
  readonly type = UserActionTypes.SET_TODO_LIST_ID;

  constructor(
    public payload: {
      userId: string;
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
  | DatabaseListenForDataStop
  | LoadItem
  | LoadItemSuccess
  | SetTodoListId
  | UpsertItem;
