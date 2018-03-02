import { createSelector } from '@ngrx/store';

import * as FromRootReducer from '../../reducers';
import * as FromAuthReducer from './auth.reducer';

export const getAuthState = (state: FromRootReducer.State) => state.auth;

export const getDisplayName = createSelector(
  getAuthState,
  FromAuthReducer.getDisplayName,
);

export const getHasDoneFirstCheck = createSelector(
  getAuthState,
  FromAuthReducer.getHasDoneFirstCheck,
);

export const getError = createSelector(getAuthState, FromAuthReducer.getError);

export const getEmailVerified = createSelector(
  getAuthState,
  FromAuthReducer.getEmailVerified,
);

export const getIsAuthenticated = createSelector(
  getAuthState,
  FromAuthReducer.getIsAuthenticated,
);

export const getIsAuthenticating = createSelector(
  getAuthState,
  FromAuthReducer.getIsAuthenticating,
);

export const getUserId = createSelector(
  getAuthState,
  FromAuthReducer.getUserId,
);
