import { TodoActions, TodoActionTypes } from '../actions/todo.action';
import { Todo } from '../shared/models/todo.model';

export interface State {
  loaded: boolean;
  loading: boolean;
  todos: Todo[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  todos: [],
};

export function reducer(state = initialState, action: TodoActions): State {
  switch (action.type) {
    case TodoActionTypes.DATABASE_LISTEN_FOR_DATA_START: {
      return {
        ...state,
        loading: true,
      };
    }

    case TodoActionTypes.DATABASE_LISTEN_FOR_DATA_STOP: {
      return {
        ...initialState,
      };
    }

    case TodoActionTypes.LoadSuccess: {
      const items: Todo[] = action.payload;

      return {
        loaded: true,
        loading: false,
        todos: items.map((book) => book),
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
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getTodos = (state: State) => state.todos;
