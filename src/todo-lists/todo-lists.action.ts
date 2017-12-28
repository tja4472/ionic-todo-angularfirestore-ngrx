// tslint:disable:max-classes-per-file
// tslint:disable:no-empty
import { Action } from '@ngrx/store';

import { TodoListsItem } from '../todo-lists/todo-lists-item.model';

export enum TodoListsActionTypes {
    ListenForData = '[TodoListsActions] Listen For Data',
    LoadSuccess = '[TodoListsActions] Load Success',
    Remove = '[TodoListsActions] Remove',
    Save = '[TodoListsActions] Save',
    SetSelectedList = '[TodoListsActions] Set Selected List',
    UnlistenForData = '[TodoListsActions] Unlisten For Data',
}

/*
export const LISTEN_FOR_DATA = '[TodoListsActions] Listen For Data';
export const LOAD_SUCCESS = '[TodoListsActions] Load Success';
export const REMOVE = '[TodoListsActions] Remove';
export const SAVE = '[TodoListsActions] Save';
export const SET_SELECTED_LIST = '[TodoListsActions] Set Selected List';
export const UNLISTEN_FOR_DATA = '[TodoListsActions] Unlisten For Data';
*/

export class ListenForData implements Action {
    readonly type = TodoListsActionTypes.ListenForData;

    constructor() { }
}

export class LoadSuccess implements Action {
    readonly type = TodoListsActionTypes.LoadSuccess;

    constructor(public payload: TodoListsItem[]) { }
}

export class Remove implements Action {
    readonly type = TodoListsActionTypes.Remove;

    constructor(public payload: string) { } // itemKey
}

export class Save implements Action {
    readonly type = TodoListsActionTypes.Save;

    constructor(public payload: TodoListsItem) { }
}

export class SetSelectedList implements Action {
    readonly type = TodoListsActionTypes.SetSelectedList;

    constructor(public listId: string) { }
}

export class UnlistenForData implements Action {
    readonly type = TodoListsActionTypes.UnlistenForData;

    constructor() { }
}

export type TodoListsActions =
    ListenForData |
    LoadSuccess |
    Remove |
    Save |
    SetSelectedList |
    UnlistenForData;
