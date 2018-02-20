import { AuthActions, AuthActionTypes } from '../auth/auth.action';
import { UserActions, UserActionTypes } from './user.action';

export interface State {
  hasLoaded: boolean;
  todoListId: string;
}

const initialState: State = {
  hasLoaded: false,
  todoListId: '',
};

export function reducer(
  state = initialState,
  action: AuthActions | UserActions,
): State {
  switch (action.type) {
    case AuthActionTypes.LISTEN_FOR_AUTH_NO_USER: {
      return {
        ...state,
        hasLoaded: false,
        todoListId: '',
      };
    }

    case UserActionTypes.DATABASE_LISTEN_FOR_DATA_START: {
      return {
        ...state,
      };
    }

    case UserActionTypes.SET_TODO_LIST_ID: {
      return {
        ...state,
        todoListId: action.payload.todoListId,
      };
    }

    case UserActionTypes.LOAD_SUCCESS: {
      const user = action.payload.item;
      let todoListId = '';

      if (user) {
        todoListId = user.todoListId;
      }

      return {
        ...state,
        hasLoaded: true,
        todoListId,
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
export const getHasLoaded = (state: State) => state.hasLoaded;
export const getTodoListId = (state: State) => state.todoListId;
