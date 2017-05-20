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

  taptapMode = [
    {name: 'telugu', display: 'telugu: అ, ఆ'},
    {name: 'hindi', display: 'hindi: अ, आ'},
    {name: 'english', display: 'english: A, B'},
    {name: 'english-lower', display: 'english: a, b'},
    {name: 'numbers', display: 'numbers: 1, 2..32'}
  ];

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
