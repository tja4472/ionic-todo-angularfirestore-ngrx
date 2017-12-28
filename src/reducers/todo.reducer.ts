import { TodoActions, TodoActionTypes } from '../actions/todo.action';
import { Todo } from '../shared/models/todo.model';

export interface IState {
    loaded: boolean;
    loading: boolean;
    todos: Todo[];
}

const initialState: IState = {
    loaded: false,
    loading: false,
    todos: []
};

export function reducer(
    state = initialState,
    action: TodoActions): IState {
    switch (action.type) {
        case TodoActionTypes.ListenForData: {
            return {
                ...state,
                loading: true,
            };
        }

        case TodoActionTypes.LoadSuccess: {
            const items: Todo[] = action.payload;

            return {
                loaded: true,
                loading: false,
                todos: items.map((book) => book)
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
export const getTodos = (state: IState) => state.todos;
