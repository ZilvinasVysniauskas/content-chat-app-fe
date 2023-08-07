import { ActionReducerMap} from "@ngrx/store";
import { UserState, userReducer } from "./reducers/user-reducer";
import { UserEffects } from "./effects/user-effets";
import { CodeAreaState, codeAreaReducer } from "./reducers/code-area-reducer";

export interface AppState {
    user: UserState;
    codeArea: CodeAreaState;
}
export const reducers: ActionReducerMap<AppState> = {
    user: userReducer,
    codeArea: codeAreaReducer
};

export const effects = [UserEffects];