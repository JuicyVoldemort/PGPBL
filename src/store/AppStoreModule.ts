import {StoreModule, StoreRootModule} from "@ngrx/store";
import {loadingReducer} from "src/store/loading/loading.reducers";
import {loginReducer} from "src/store/login/login.reducers";
import { AppState } from 'src/store/AppState';
import { EffectsModule } from "@ngrx/effects";
import { LoginEffects } from "src/app/pages/login/login.effects";
import { registerReducer } from "./register/register.reducer";

export const AppStoreModule = [
    StoreModule.forRoot([]),
    StoreModule.forFeature("loading", loadingReducer),
    StoreModule.forFeature("login", loginReducer),
    StoreModule.forFeature("register", registerReducer),
    EffectsModule.forRoot([
        LoginEffects
    ])
]


// Vid nomor playlist 24 membangun 
// State, Actions, Reducers untuk halaman register. Prosedur hampir sama untuk Login page