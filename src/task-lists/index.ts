import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTaskLists from './task-list.reducer';
import * as fromRoot from '../reducers';

export interface ITaskListsState {
  taskLists: fromTaskLists.IState;
}

export interface IState extends fromRoot.IState {
  taskLists: ITaskListsState;
}

export const reducers = {
  taskLists: fromTaskLists.reducer,
};

export const getTaskListsState = createFeatureSelector<ITaskListsState>(
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
