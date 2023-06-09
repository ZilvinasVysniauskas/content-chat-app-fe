import { createAction, props } from '@ngrx/store';
import { UserProfile } from '../types';

export const fetchUserProfile = createAction('[App] Fetch User Profile');

export const fetchUserProfileSuccess = createAction('[App] Fetch User Profile Success',
    props<{ userProfile: UserProfile }>());

export const fetchUserProfileFailure = createAction('[App] Fetch User Profile Failure',
    props<{ error: any }>());