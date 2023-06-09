import { Route } from "@angular/router";
import { LoginComponent } from "./app-authorization/components/login/login.component";
import { AuthGuard } from "./app-authorization/guards/auth-guard/auth-guard";
import { ChatRoom2Component } from "./app-home/components/chat-room2/chat-room2.component";
import { HomeComponent } from "./app-home/home.component";
import { OAuth2RedirectGuard } from "./app-authorization/guards/o-auth2-redirect-guard/oauth2-redirect-guard";
import { UserGuard } from "./app-authorization/guards/user-guard/user-guard";
import { LoginGuard } from "./app-authorization/guards/login-guard/login-guard";
import { Type } from "@angular/core";

export const ROUTES: Route[] = [
    {
        path: 'oauth2/redirect',
        canActivate: [OAuth2RedirectGuard],
        component: {} as Type<any>,
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard],
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard, UserGuard],
        children: [
            { path: '', component: ChatRoom2Component }       
        ]
    }
];