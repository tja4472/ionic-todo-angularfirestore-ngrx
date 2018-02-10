import {
  TodoCompletedActions,
  TodoCompletedActionTypes,
} from '../actions/todo-completed.action';
import { TodoCompleted } from '../shared/models/todo-completed.model';

export interface State {
  loaded: boolean;
  loading: boolean;
  todoCompletedList: TodoCompleted[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  todoCompletedList: [],
};

export function reducer(
  state = initialState,
  action: TodoCompletedActions,
): State {
  switch (action.type) {
    case TodoCompletedActionTypes.DATABASE_LISTEN_FOR_DATA_START: {
      return {
        ...state,
        loading: true,
      };
    }

    case TodoCompletedActionTypes.LoadSuccess: {
      const items: TodoCompleted[] = action.payload;

      return {
        loaded: true,
        loading: false,
        todoCompletedList: items.map((book) => book),
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
export const getTodoCompletedList = (state: State) => state.todoCompletedList;
