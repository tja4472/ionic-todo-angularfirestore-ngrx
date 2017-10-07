// tslint:disable:max-classes-per-file
// tslint:disable:no-empty
import { Action } from '@ngrx/store';

import { TodoCompleted } from '../shared/models/todo-completed.model';


export const LISTEN_FOR_DATA = '[TodoCompletedActions] Listen For Data';
export const LOAD_SUCCESS = '[TodoCompletedActions] Load Success';
export const MOVE_TO_CURRENT = '[TodoCompletedActions] Move To Current';
export const REMOVE = '[TodoCompletedActions] Remove';
export const SAVE = '[TodoCompletedActions] Save';
export const UNLISTEN_FOR_DATA = '[TodoCompletedActions] Unlisten For Data';

export class ListenForData implements Action {
    readonly type = LISTEN_FOR_DATA;

    constructor() { }
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: TodoCompleted[]) { }
}

export class MoveToCurrent implements Action {
    readonly type = MOVE_TO_CURRENT;

    constructor(public payload: TodoCompleted) { }
}

export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public payload: string) { } // itemKey
}

export class Save implements Action {
    readonly type = SAVE;

    constructor(public payload: TodoCompleted) { }
}

export class UnlistenForData implements Action {
    readonly type = UNLISTEN_FOR_DATA;

    constructor() { }
}

export type Actions =
    ListenForData |
    LoadSuccess |
    MoveToCurrent |
    Remove |
    Save |
    UnlistenForData;
