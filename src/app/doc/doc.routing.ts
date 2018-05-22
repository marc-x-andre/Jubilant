import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocComponent } from './doc.component';

const appRoutes: Routes = [
    {
        path: '',
        component: DocComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class DocRoutingModule { }
