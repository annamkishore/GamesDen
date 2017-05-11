import {Component, ElementRef, Input, OnChanges, OnInit} from '@angular/core';
import {Elapsed, StopWatch} from '../stop-watch';
import {UtilServiceService} from "../util-service.service";

@Component({
  selector: 'gd-tap-me',
  templateUrl: './tap-me.component.html',
  styleUrls: ['./tap-me.component.css'],
  providers: [UtilServiceService]
})
export class TapMeComponent implements OnInit, OnChanges {

  @Input()
  mode: string;

  @Input()
  gridSize: number;

  @Input()
  restartFlag: boolean;   // workaround flag to call restart method from HomeComponent

  tiles: any;
  currTappedTileIndex: number;
  gameMessage: string;

  gameWatch: StopWatch;
  elapsedObj: Elapsed;

  constructor(private elRef: ElementRef, private utilService: UtilServiceService) {
  }

  ngOnChanges() {
    if( this.gameWatch ) {
      this.restart();
    }
  }

  ngOnInit() {
    const tappingModeMap = {
      'hindi':  ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'],
      'telugu': ['అ', 'ఆ', 'ఇ', 'ఈ', 'ఉ', 'ఊ', 'ఋ', 'ౠ', 'ఎ', 'ఏ', 'ఐ', 'ఒ', 'ఓ', 'ఔ', 'అం', 'అః'],
      'english-lower': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'],
      'english': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
        'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    };

    if( this.mode === 'hindi' ) {
      this.gridSize = 13;
    }

    const letters = tappingModeMap[this.mode];
    let letters1 = [];
    letters.map((item, index) => letters1.push({index, item}));
    letters1 = this.utilService.shuffle(letters1, this.gridSize);
    this.tiles = [];
    for (let i = 0; i < this.gridSize; i++) {
      this.tiles[i] = letters1[i];
    }

    this.gameMessage = null;
    this.currTappedTileIndex = -1;
    this.gameWatch = new StopWatch(1);
    this.gameWatch.start();
    this.elapsedObj = this.gameWatch.elapsed;
  }

  /**
   * @param currIndex
   */
  onTap(currIndex) {
    if (this.currTappedTileIndex + 1 === currIndex) {
      // hide button
      this.elRef.nativeElement.querySelectorAll('button[id=\'' + currIndex + '\']')[0].style.visibility = 'hidden';
      this.currTappedTileIndex++;
      console.log(this.currTappedTileIndex);
    }
    if (this.currTappedTileIndex === this.tiles.length - 1) {
      this.gameOver();
    }
  }

  /**
   * gameOver
   */
  gameOver() {
    this.gameWatch.stop();
    this.gameMessage = ' -- Congratulations!!';
  }

  /**
   * restart
   */
  restart() {
    this.gameWatch.reset();
    this.ngOnInit();
  }

}
