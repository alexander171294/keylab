import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyComponent } from './key.component';
import { OctavaComponent } from './octava/octava.component';



@NgModule({
  declarations: [
    KeyComponent,
    OctavaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    KeyComponent
  ]
})
export class KeyModule { }
