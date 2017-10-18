import * as Action from './todo-lists.action';
import { TodoListsItem } from './todo-lists-item.model';

export interface IState {
    loaded: boolean;
    loading: boolean;
    todoLists: TodoListsItem[];
}

const initialState: IState = {
    loaded: false,
    loading: false,
    todoLists: []
};

export function reducer(
    state = initialState,
    action: Action.Actions): IState {
    switch (action.type) {
        case Action.LISTEN_FOR_DATA: {
            return {
                ...state,
                loading: true,
            };
        }

        case Action.LOAD_SUCCESS: {
            const items: TodoListsItem[] = action.payload;

            return {
                loaded: true,
                loading: false,
                todoLists: items.map((book) => book)
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
export const getTodoLists = (state: IState) => state.todoLists;
