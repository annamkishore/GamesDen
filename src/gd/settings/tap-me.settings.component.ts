import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'gd-tap-me-settings',
  templateUrl: './tap-me.settings.component.html',
  styleUrls: ['./tap-me.settings.component.css']
})
export class TapMeSettingsComponent implements OnInit, AfterContentInit {

  @Output()
  modeSelectedOut: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  selectedMode: any = 'english';

  taptapMode = [{name: 'telugu', display: 'telugu: t, e'},
    {name: 'hindi', display: 'hindi: h, i'},
    {name: 'english', display: 'english: a, b'}];

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
  }

  onChange() {
    this.modeSelectedOut.emit(this.selectedMode);
  }
}
