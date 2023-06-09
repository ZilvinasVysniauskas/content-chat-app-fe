import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { take } from "rxjs";
import { fetchUserProfile } from "src/app/state/actions/user-actions";
import { selectLoadingStatus } from "src/app/state/selectors/user-selector";

@Injectable({
    providedIn: "root"
})
export class UserGuard {
    constructor(private store: Store) { }

    canActivate(): boolean {
        this.store.select(selectLoadingStatus).pipe(take(1)).subscribe(loadingStatus => {
            if (!loadingStatus.loaded && !loadingStatus.loading) {
                this.store.dispatch(fetchUserProfile())
            }
        });
        return true
    }
}