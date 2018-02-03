import { TodoListsActionTypes, TodoListsActions } from './todo-lists.action';
import { TodoListsItem } from './todo-lists-item.model';

export interface IState {
  loaded: boolean;
  loading: boolean;
  selectedListId: string | null;
  todoLists: TodoListsItem[];
}

const initialState: IState = {
  loaded: false,
  loading: false,
  selectedListId: null,
  todoLists: [],
};

export function reducer(
  state = initialState,
  action: TodoListsActions,
): IState {
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
export const getLoaded = (state: IState) => state.loaded;
export const getLoading = (state: IState) => state.loading;
export const getTodoLists = (state: IState) => state.todoLists;
