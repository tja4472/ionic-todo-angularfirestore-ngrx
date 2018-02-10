import { TodoListsActionTypes, TodoListsActions } from './todo-lists.action';
import { TodoListsItem } from './todo-lists-item.model';

export interface State {
  loaded: boolean;
  loading: boolean;
  selectedListId: string | null;
  todoLists: TodoListsItem[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  selectedListId: null,
  todoLists: [],
};

export function reducer(state = initialState, action: TodoListsActions): State {
  switch (action.type) {
    case TodoListsActionTypes.ListenForData: {
      return {
        ...state,
        loading: true,
      };
    }

    case TodoListsActionTypes.LoadSuccess: {
      const items: TodoListsItem[] = action.payload;

      return {
        loaded: true,
        loading: false,
        selectedListId: null,
        todoLists: items.map((book) => book),
      };
    }

    case TodoListsActionTypes.SetSelectedList: {
      return {
        ...state,
        selectedListId: action.listId,
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
export const getTodoLists = (state: State) => state.todoLists;
