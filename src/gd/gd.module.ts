import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {TapMeComponent} from './tap-me/tap-me.component';
import {TapMeSettingsComponent} from './settings/tap-me.settings.component';
import {TapMeHomeComponent} from './tap-me-home/tap-me-home.component';
import {SmartSlateComponent} from './smart-slate/smart-slate.component';

const appRoutes: Routes = [
  {path: 'tapme', component: TapMeComponent},
  {path: 'tapme-settings', component: TapMeSettingsComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    TapMeComponent,
    TapMeSettingsComponent,
    TapMeHomeComponent,
    SmartSlateComponent
  ],
  exports: [
    TapMeComponent,
    TapMeSettingsComponent,
    TapMeHomeComponent,
    SmartSlateComponent
  ]
})
export class GdModule {
}
