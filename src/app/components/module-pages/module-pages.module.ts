import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulePagesComponent } from './module-pages.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ModulePagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class ModulePagesModule { }
