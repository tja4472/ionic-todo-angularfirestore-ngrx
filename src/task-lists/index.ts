import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTaskLists from './task-list.reducer';
import * as fromRoot from '../reducers';

export interface TaskListsState {
  taskLists: fromTaskLists.State;
}

export interface State extends fromRoot.State {
  taskLists: TaskListsState;
}

export const reducers = {
  taskLists: fromTaskLists.reducer,
};

export const getTaskListsState = createFeatureSelector<TaskListsState>(
  'taskLists',
);

export const getTaskListsEntitiesState = createSelector(
  getTaskListsState,
  (state) => state.taskLists,
);

export const getSelectedTaskListId = createSelector(
  getTaskListsEntitiesState,
  fromTaskLists.getSelectedId,
);

export const {
  selectIds: getTaskListIds,
  selectEntities: getTaskListEntities,
  selectAll: getAllTaskLists,
  selectTotal: getTotalTaskLists,
} = fromTaskLists.adapter.getSelectors(getTaskListsEntitiesState);

export const getSelectedTaskList = createSelector(
  getTaskListEntities,
  getSelectedTaskListId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  },
);
