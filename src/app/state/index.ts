import { ActionReducerMap} from "@ngrx/store";
import { UserState, userReducer } from "./reducers/user-reducer";
import { UserEffects } from "./effects/user-effets";

export interface AppState {
    user: UserState;
}
export const reducers: ActionReducerMap<AppState> = {
    user: userReducer
};

export const effects = [UserEffects];