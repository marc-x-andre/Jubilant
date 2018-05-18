import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PlayComponent } from './play/play.component';
import { AuthGuard } from './service/auth.service';

const appRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'play',
        canActivate: [AuthGuard],
        component: PlayComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'login/:info',
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: '/play'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
