import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { TaskListActionTypes, TaskListActions } from './task-list.action';

import { TaskList } from './task-list.model';

export interface State extends EntityState<TaskList> {
  loaded: boolean;
  loading: boolean;
  selectedTaskListId: string | null;
}

export const adapter: EntityAdapter<TaskList> = createEntityAdapter<TaskList>(
  {
    selectId: (taskList: TaskList) => taskList.id,
    sortComparer: false,
  },
);

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  selectedTaskListId: null,
});

export function reducer(state = initialState, action: TaskListActions): State {
  switch (action.type) {
    case TaskListActionTypes.ListenForData: {
      return {
        ...state,
        loading: true,
      };
    }

    case TaskListActionTypes.LoadSuccess: {
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

    case TaskListActionTypes.SetSelectedList: {
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
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getSelectedId = (state: State) => state.selectedTaskListId;
