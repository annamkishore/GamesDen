import {Component, ElementRef, OnInit} from '@angular/core';
import {Elapsed, StopWatch} from '../stop-watch';
// import {clearInterval} from "timers";

@Component({
  selector: 'gd-tap-me',
  templateUrl: './tap-me.component.html',
  styleUrls: ['./tap-me.component.css']
})
export class TapMeComponent implements OnInit {

  tiles: any;
  currTappedTileIndex: number;
  gameMessage: string;

  gameWatch: StopWatch;
  elapsedObj: Elapsed;

  constructor(private elRef: ElementRef) {
  }

  ngOnInit() {
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
      't', 'u', 'v', 'w', 'x', 'y', 'z'];
    letters = ['అ', 'ఆ', 'ఇ', 'ఈ', 'ఉ', 'ఊ', 'ఋ', 'ౠ', 'ఎ', 'ఏ', 'ఐ', 'ఒ', 'ఓ', 'ఔ', 'అం', 'అః'];
    let letters1 = [];
    letters.map((item, index) => letters1.push({index, item}) );
    // letters1 = this.shuffle(letters1, 20);
    letters1 = this.shuffle(letters1);
    this.tiles = [];
    for (let i = 0; i < letters1.length; i++) {
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
      this.elRef.nativeElement.querySelectorAll("button[id='" + currIndex + "']")[0].style.visibility = "hidden";
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
    this.gameMessage = " -- Congratulations!!";
  }

  /**
   * restart
   */
  restart() {
    this.gameWatch.reset();
    this.ngOnInit();
  }

  /**
   * shuffle
   * @param array
   * @param shuffleLength
   * @returns {any}
   */
  shuffle(array, shuffleLength?) {
    let currentIndex = shuffleLength ? shuffleLength : array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
