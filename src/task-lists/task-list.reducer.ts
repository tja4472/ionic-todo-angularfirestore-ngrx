import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as taskListAction from './task-list.action';

import { ITaskList } from './task-list.model';

export interface IState extends EntityState<ITaskList> {
    loaded: boolean;
    loading: boolean;
    selectedTaskListId: string | null;
}

export const adapter: EntityAdapter<ITaskList> = createEntityAdapter<ITaskList>({
    selectId: (taskList: ITaskList) => taskList.id,
    sortComparer: false,
});

export const initialState: IState = adapter.getInitialState({
    loaded: false,
    loading: false,
    selectedTaskListId: null,
});

export function reducer(
    state = initialState,
    action: taskListAction.Actions): IState {
    switch (action.type) {
        case taskListAction.LISTEN_FOR_DATA: {
            return {
                ...state,
                loading: true,
            };
        }

        case taskListAction.LOAD_SUCCESS: {
            return {
                ...adapter.addMany(action.payload, state),
                loaded: true,
                loading: false,
                selectedTaskListId: state.selectedTaskListId,
            };

            /*
                        const items: TodoListsItem[] = action.payload;

                        return {
                            loaded: true,
                            loading: false,
                            selectedListId: null,
                            todoLists: items.map((book) => book)
                        };
            */
        }

        case taskListAction.SET_SELECTED_LIST: {
            return {
                ...state,
                selectedTaskListId: action.listId,
            };
        }

        default: {
            return state;
        }
    }
}

// =========
// Selectors
// =========
export const getLoaded = (state: IState) => state.loaded;
export const getLoading = (state: IState) => state.loading;
export const getSelectedId = (state: IState) => state.selectedTaskListId;
