import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap} from 'rxjs/operators';
import { fetchUserProfile, fetchUserProfileFailure, fetchUserProfileSuccess } from '../actions/user-actions';
import { UserService } from 'src/app/app-home/services/user/user.service';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {

    constructor(private actions$: Actions, private userService: UserService) { }

    handleFetchUserProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchUserProfile),
            mergeMap(() => 
                this.userService.getUserProfile().pipe(
                    map(userProfile => {
                        return fetchUserProfileSuccess({ userProfile })
                    }),
                    catchError(error => of(fetchUserProfileFailure({ error })))
                )
            )
        )
    );
}