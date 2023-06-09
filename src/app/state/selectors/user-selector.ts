import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user-reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserProfile = createSelector(
  selectUserState,
  (state: UserState) => state.userProfile
);

export const selectLoadingStatus = createSelector(
  selectUserState,
  (state: UserState) => state.loadingStatus
);