import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class UtilServiceService {

  showSettingsPanel = false;
  count = 0;

  constructor(private router: Router) {
  }

  getCount() {
    return this.count;
  }
  /**
   * showSettings
   */
  showSettings() {
    this.count++;
    if (this.showSettingsPanel) {
      this.router.navigate(['tapme-settings']);
    } else {
      this.router.navigate(['tapme']);
    }
    this.showSettingsPanel = !this.showSettingsPanel;
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
