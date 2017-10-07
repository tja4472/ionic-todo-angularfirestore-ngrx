// tslint:disable:max-classes-per-file
// tslint:disable:no-empty
import { Action } from '@ngrx/store';

import { IReorderArrayIndexes } from '../shared/models/reorder-array-indexes.model';
import { Todo } from '../shared/models/todo.model';

export const CLEAR_COMPLETED = '[ToDoActions] Clear Completed';
export const LISTEN_FOR_DATA = '[ToDoActions] Listen For Data';
export const LOAD_SUCCESS = '[ToDoActions] Load Success';
export const REORDER_LIST = '[ToDoActions] Reorder List';
export const REMOVE = '[ToDoActions] Remove';
export const SAVE = '[ToDoActions] Save';
export const UNLISTEN_FOR_DATA = '[ToDoActions] Unlisten For Data';

export class ClearCompleted implements Action {
    readonly type = CLEAR_COMPLETED;

    constructor() { }
}

export class ListenForData implements Action {
    readonly type = LISTEN_FOR_DATA;

    constructor() { }
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: Todo[]) { }
}

export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public payload: string) { } // itemKey
}

export class ReorderList implements Action {
    readonly type = REORDER_LIST;

    constructor(public payload: IReorderArrayIndexes) { }
}

export class Save implements Action {
    readonly type = SAVE;

    constructor(public payload: Todo) { }
}

export class UnlistenForData implements Action {
    readonly type = UNLISTEN_FOR_DATA;

    constructor() { }
}

export type Actions =
    ClearCompleted |
    ListenForData |
    LoadSuccess |
    Remove |
    ReorderList |
    Save |
    UnlistenForData;
