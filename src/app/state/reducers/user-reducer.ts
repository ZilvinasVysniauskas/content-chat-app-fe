import { createReducer, on } from '@ngrx/store';
import { fetchUserProfileFailure, fetchUserProfileSuccess } from '../actions/user-actions';
import { LoadingStatus, UserProfile } from '../types';

export interface UserState {
    userProfile?: UserProfile;
    loadingStatus: LoadingStatus;
    error?: any;
}
export const initialState: UserState = {
    loadingStatus: {
        loading: false,
        loaded: false
    },
};
export const appReducer = createReducer(
    initialState,
    on(fetchUserProfileSuccess, (state, { userProfile }) =>
    ({
        ...state,
        userProfile: userProfile,
        loadingStatus: {
            loading: false,
            loaded: true
        }
    })),

    on(fetchUserProfileFailure, (state, { error }) =>
    ({
        ...state,
        loadingStatus: {
            loading: false,
            loaded: false
        },
        error
    }))

);

export function userReducer(state: UserState | undefined, action: any) {
    return appReducer(state, action);
}