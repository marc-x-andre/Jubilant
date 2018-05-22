import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DocComponent } from './doc.component';
import { DocRoutingModule } from './doc.routing';

@NgModule({
  declarations: [
    DocComponent
  ],
  imports: [
    CommonModule,
    DocRoutingModule,
  ]
})
export class DocModule { }
