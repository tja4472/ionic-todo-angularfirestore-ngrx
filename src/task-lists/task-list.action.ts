// tslint:disable:max-classes-per-file
// tslint:disable:no-empty
import { Action } from '@ngrx/store';

import { ITaskList } from './task-list.model';

export const LISTEN_FOR_DATA = '[TaskList] Listen For Data';
export const LOAD_SUCCESS = '[TaskList] Load Success';
export const REMOVE = '[TaskList] Remove';
export const SAVE = '[TaskList] Save';
export const SET_SELECTED_LIST = '[TaskList] Set Selected List';
export const UNLISTEN_FOR_DATA = '[TaskList] Unlisten For Data';

export class ListenForData implements Action {
    readonly type = LISTEN_FOR_DATA;

    constructor() { }
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: ITaskList[]) { }
}

export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public payload: string) { } // itemKey
}

export class Save implements Action {
    readonly type = SAVE;

    constructor(public payload: ITaskList) { }
}

export class SetSelectedList implements Action {
    readonly type = SET_SELECTED_LIST;

    constructor(public listId: string) { }
}

export class UnlistenForData implements Action {
    readonly type = UNLISTEN_FOR_DATA;

    constructor() { }
}

export type Actions =
    ListenForData |
    LoadSuccess |
    Remove |
    Save |
    SetSelectedList |
    UnlistenForData;
