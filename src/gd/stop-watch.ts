import {factoryOrValue} from "rxjs/operator/multicast";
/**
 * StopWatch
 */
export class StopWatch {
  elapsed: any;
  timerObj: any;
  delay: number;

  /**
   * @param delay - in seconds
   */
  public constructor(delay: number) {
    this.elapsed = new Elapsed();
    this.delay = delay;
  }

  public start() {
    const handler = () => {
      this.elapsed.value++;
    };
    this.timerObj = setInterval(handler, this.delay * 1000);
  }

  public stop() {
    clearInterval(this.timerObj);
  }

  public reset() {
    this.elapsed = 0;
    clearInterval(this.timerObj);
  }
}

class Elapsed {
  value: number;

  constructor() {
    this.value = 0;
  }

  toString() {
    return `${(this.value / 60).toFixed()}m ${this.value % 60}s`;
  }
}
