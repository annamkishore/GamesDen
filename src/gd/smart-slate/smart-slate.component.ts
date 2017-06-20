import {Component, OnInit} from '@angular/core';

enum PenStyleEnum {
  Basic,
  Web,
  Pattern
}

@Component({
  selector: 'gd-smart-slate',
  templateUrl: './smart-slate.component.html',
  styleUrls: ['./smart-slate.component.css']
})
export class SmartSlateComponent implements OnInit {

  canvasElement: HTMLCanvasElement;
  ctx: any;
  width: number;
  height: number;

  lastX: number;
  lastY: number;
  mousePressed: boolean;

  penColor: any;
  bgColor: any;
  penSize: number;

  // for pen styles
  points: Array<any>;
  penStyle: PenStyleEnum;

  showSettings = false;

  colorBox = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  constructor() {
  }

  ngOnInit() {
    this.init();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    // const buttonHeight = document.getElementById('bgColorButton').offsetHeight / 2;
    // this.height = window.innerHeight - (buttonHeight * 3);
  }

  init() {
    console.log('hello 33');
    this.canvasElement = <HTMLCanvasElement>document.getElementById('myCanvas');

    this.canvasElement.addEventListener('touchstart', e => this.onStartDraw(e));
    this.canvasElement.addEventListener('touchmove', e => { if (this.mousePressed) { this.draw(e, false); }});
    this.canvasElement.addEventListener('touchend', e => this.closeCurrPath());

    this.canvasElement.addEventListener('mousedown', e => this.onStartDraw(e));
    this.canvasElement.addEventListener('mousemove', e => { if (this.mousePressed) { this.draw(e, false); }});
    this.canvasElement.addEventListener('mouseup', e => this.closeCurrPath());
    this.canvasElement.addEventListener('mouseout', e => this.closeCurrPath());

    this.ctx = this.canvasElement.getContext('2d');

    this.penColor = '#99FF99';
    this.bgColor = '#9999FF';
    this.setBgColor();
    this.penSize = 10;
    this.penStyle = PenStyleEnum.Basic;
    this.points = new Array();
  }

  onStartDraw(e) {
    this.mousePressed = true;
    this.draw(e, true);
  }

  closeCurrPath() {
    this.mousePressed = false;
    if (this.penStyle === PenStyleEnum.Web) {
      this.points.length = 0;
    }
  }

  setPenStyle(penStyle) {
    this.penStyle = penStyle;
    this.points.length = 0;
    this.lastX = null;
    this.lastY = null;
  }

  setBgColor() {
    this.canvasElement.style.backgroundColor = this.bgColor;
  }

  draw(e, isPoint) {
    let currX, currY, oneFingerTouch;
    if (e instanceof TouchEvent) {
      if (e.targetTouches.length === 1) { // One finger
        oneFingerTouch = e.targetTouches[0];
        currX = oneFingerTouch.pageX;
        currY = oneFingerTouch.pageY;
      }
    } else if (e instanceof MouseEvent) {
      currX = e.pageX;
      currY = e.pageY;
    }

    if (this.penStyle === PenStyleEnum.Web) {
      this.points.push({x: currX, y: currY});
    }

    this.ctx.beginPath();
    if (isPoint) {
      this.ctx.arc(currX, currY, this.penSize / 2, 0, 2 * Math.PI);
      if (this.penStyle !== PenStyleEnum.Pattern) {
        this.ctx.fillStyle = this.penColor;
        this.ctx.fill();
      }
    } else {
      switch (this.penStyle) {
        case PenStyleEnum.Basic:    //  Basic
        case PenStyleEnum.Pattern:  //  Pattern
          this.ctx.moveTo(this.lastX, this.lastY);
          this.ctx.lineTo(currX, currY);
          this.ctx.closePath();
          break;
        case PenStyleEnum.Web:      //  Web
          this.ctx.moveTo(this.points[0].x, this.points[0].y);
          for (let i = 1; i < this.points.length; i++) {
            this.ctx.lineTo(this.points[i].x, this.points[i].y);
            const nearPoint = this.points[i - 5];
            if (nearPoint) {
              this.ctx.moveTo(nearPoint.x, nearPoint.y);
              this.ctx.lineTo(this.points[i].x, this.points[i].y);
            }
          }
          this.ctx.closePath();
          break;
      }

      this.ctx.lineJoin = 'round';
      this.ctx.lineWidth = this.penSize;
      this.ctx.strokeStyle = this.penStyle === PenStyleEnum.Pattern ? this.getPattern() : this.penColor;
      this.ctx.stroke();
    }

    this.lastX = currX;
    this.lastY = currY;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.points.length = 0;
  }

  getPattern() {
    const patternCanvas = document.createElement('canvas'),
      dotWidth = 20,
      dotDistance = 5,
      ctx = patternCanvas.getContext('2d');

    patternCanvas.width = patternCanvas.height = 10;
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 5);
    ctx.lineTo(10, 5);
    ctx.closePath();
    ctx.stroke();
    return ctx.createPattern(patternCanvas, 'repeat');
  }

  showHideSettings() {
    this.showSettings = !this.showSettings;
  }
}
