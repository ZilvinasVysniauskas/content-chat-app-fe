import { Route } from "@angular/router";
import { LoginComponent } from "./app-authorization/components/login/login.component";
import { RegisterComponent } from "./app-authorization/components/register/register.component";
import { AuthGuard } from "./app-authorization/guards/auth-guard";
// import { AuthService } from "./app-authorization/services/auth.service";
import { MessageComponent } from "./app-home/components/message/message.component";
import { HomeComponent } from "./app-home/home.component";

export const ROUTES: Route[] = [
    {
        path: 'auth',
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
        ]
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: MessageComponent }       
        ]
    }
];