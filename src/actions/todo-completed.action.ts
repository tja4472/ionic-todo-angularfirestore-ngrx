// tslint:disable:max-classes-per-file
// tslint:disable:no-empty
import { Action } from '@ngrx/store';

import { TodoCompleted } from '../shared/models/todo-completed.model';

export enum TodoCompletedActionTypes {
    ListenForData = '[TodoCompletedActions] Listen For Data',
    LoadSuccess = '[TodoCompletedActions] Load Success',
    MoveToCurrent = '[TodoCompletedActions] Move To Current',
    Remove = '[TodoCompletedActions] Remove',
    Save = '[TodoCompletedActions] Save',
    UnlistenForData = '[TodoCompletedActions] Unlisten For Data',
}

/*
export const LISTEN_FOR_DATA = '[TodoCompletedActions] Listen For Data';
export const LOAD_SUCCESS = '[TodoCompletedActions] Load Success';
export const MOVE_TO_CURRENT = '[TodoCompletedActions] Move To Current';
export const REMOVE = '[TodoCompletedActions] Remove';
export const SAVE = '[TodoCompletedActions] Save';
export const UNLISTEN_FOR_DATA = '[TodoCompletedActions] Unlisten For Data';
*/

export class ListenForData implements Action {
    readonly type = TodoCompletedActionTypes.ListenForData;

    constructor() { }
}

export class LoadSuccess implements Action {
    readonly type = TodoCompletedActionTypes.LoadSuccess;

    constructor(public payload: TodoCompleted[]) { }
}

export class MoveToCurrent implements Action {
    readonly type = TodoCompletedActionTypes.MoveToCurrent;

    constructor(public payload: TodoCompleted) { }
}

export class Remove implements Action {
    readonly type = TodoCompletedActionTypes.Remove;

    constructor(public payload: string) { } // itemKey
}

export class Save implements Action {
    readonly type = TodoCompletedActionTypes.Save;

    constructor(public payload: TodoCompleted) { }
}

export class UnlistenForData implements Action {
    readonly type = TodoCompletedActionTypes.UnlistenForData;

    constructor() { }
}

export type TodoCompletedActions =
    ListenForData |
    LoadSuccess |
    MoveToCurrent |
    Remove |
    Save |
    UnlistenForData;
