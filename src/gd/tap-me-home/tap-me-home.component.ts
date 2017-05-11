import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {UtilServiceService} from "../util-service.service";

@Component({
  selector: 'gd-tap-me-home',
  templateUrl: './tap-me-home.component.html',
  styleUrls: ['./tap-me-home.component.css'],
  providers: [UtilServiceService]
})
export class TapMeHomeComponent implements OnInit {

  settingsShowFlag = false;
  gameMode = 'english';

  constructor(private utilService: UtilServiceService) {
  }

  ngOnInit() {
  }

  showSettings() {
    this.settingsShowFlag = !this.settingsShowFlag;
  }

  restart() {
  }

  onModeSelected(event) {
    this.gameMode = event;
  }
}
