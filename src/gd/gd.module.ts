import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TapMeComponent} from './tap-me/tap-me.component';
import {TapMeSettingsComponent} from './settings/tap-me.settings.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TapMeComponent,
    TapMeSettingsComponent
  ],
  exports: [
    TapMeComponent,
    TapMeSettingsComponent
  ]
})
export class GdModule {
}
