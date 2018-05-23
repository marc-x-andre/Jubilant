import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth.service';

import {
    PlayComponent,
    DashboardComponent,
} from './component';

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
        path: 'documentation',
        loadChildren: './doc/doc.module#DocModule'
    },
    {
        path: '**',
        redirectTo: '/dashboard'
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
