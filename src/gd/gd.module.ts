import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TapMeComponent} from './tap-me/tap-me.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TapMeComponent
  ],
  exports: [
    TapMeComponent
  ]
})
export class GdModule { }
