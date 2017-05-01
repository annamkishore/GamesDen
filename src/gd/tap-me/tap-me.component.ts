import {Component, ElementRef, OnInit} from '@angular/core';
// import {clearInterval} from "timers";

@Component({
  selector: 'gd-tap-me',
  templateUrl: './tap-me.component.html',
  styleUrls: ['./tap-me.component.css']
})
export class TapMeComponent implements OnInit {

  tiles: any;

  tapped: any;

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

    this.tapped = -1;
    this.elapsed = 0;
    this.timeMsg = null;
    this.tick();
  }

  onTap(currIndex) {
    this.gameOver();
    if (this.tapped + 1 === currIndex) {
      // remove button
      // event.target.parentElement.style.display = "none";
      this.elRef.nativeElement.querySelectorAll("button[id='" + currIndex + "']")[0].style.visibility = "hidden";
      this.tapped++;
      console.log(this.tapped);
    }
    if (this.tapped === this.tiles.length - 1) {
      this.gameOver();
    }
  }

  gameOver() {
    clearInterval(this.timerObj);
    this.timeMsg = (this.elapsed/60).toFixed() + "m " + (this.elapsed%60) + "s" + " -- Congratulations!!";
  }

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

  timeMsg: any;
  elapsed: any;
  timerObj: any;
  tick() {
    this.timerObj = setInterval(() => {this.elapsed++; this.timeMsg=(this.elapsed/60).toFixed() + "m " + (this.elapsed%60) + "s"}, 1 * 1000);
  }

  reset() {
    clearInterval(this.timerObj);
    this.ngOnInit();
  }
}
