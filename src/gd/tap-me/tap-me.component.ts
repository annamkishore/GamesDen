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
        'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      'numbers': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
              '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
              '41', '42', '43', '44', '45', '46', '47', '48', '49', '50']
    };

    if (this.mode === 'hindi') {
      this.gridSize = 13;
    }

    let lettersMap = [];
    tappingModeMap[this.mode].map((item, index) => lettersMap.push({index, item}));
    const shuffleLength = lettersMap.length > this.gridSize ? this.gridSize : lettersMap.length;
    lettersMap = this.utilService.shuffle(lettersMap, shuffleLength);
    this.tiles = [];
    for (let i = 0; i < shuffleLength; i++) {
      this.tiles[i] = lettersMap[i];
    }

    this.gameMessage = null;
    this.currTappedTileIndex = -1;
    this.gameWatch = new StopWatch();
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
