import {Component, OnInit} from '@angular/core';

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

  constructor() {
  }

  ngOnInit() {
    this.init();
    this.width = window.innerWidth;
    const buttonHeight = document.getElementById('bgColorButton').offsetHeight / 2;
    this.height = window.innerHeight - (buttonHeight * 3);
  }

  init() {
    console.log('hello 33');
    this.canvasElement = <HTMLCanvasElement>document.getElementById('myCanvas');

    this.canvasElement.addEventListener('touchstart', e => { this.mousePressed = true; this.draw(e, true); });
    this.canvasElement.addEventListener('touchmove', e => { if (this.mousePressed) { this.draw(e, false); }});
    this.canvasElement.addEventListener('touchend', e => this.mousePressed = false);

    this.canvasElement.addEventListener('mousedown', e => { this.mousePressed = true; this.draw(e, true); });
    this.canvasElement.addEventListener('mousemove', e => { if (this.mousePressed) { this.draw(e, false); }});
    this.canvasElement.addEventListener('mouseup', e => this.mousePressed = false);
    this.canvasElement.addEventListener('mouseout', e => this.mousePressed = false);

    this.ctx = this.canvasElement.getContext('2d');

    this.penColor = '#FFFFFF';
    this.bgColor = '#000000';
    this.setBgColor();
    this.penSize = 10;
  }

  setBgColor() {
    this.canvasElement.style.backgroundColor = this.bgColor;
  }

  draw(e, isPoint) {
    let currX, currY, oneFingerTouch;
    if (e instanceof TouchEvent) {
      if ( e.targetTouches.length === 1 ) { // One finger
        oneFingerTouch = e.targetTouches[0];
        currX = oneFingerTouch.pageX;
        currY = oneFingerTouch.pageY;
      }
    }else if (e instanceof MouseEvent ) {
      currX = e.pageX;
      currY = e.pageY;
    }

    this.ctx.beginPath();
    if (isPoint) {
      this.ctx.arc(currX, currY, this.penSize / 2, 0, 2 * Math.PI);
      this.ctx.fillStyle = this.penColor;
      this.ctx.fill();
    } else {
      this.ctx.moveTo(this.lastX, this.lastY);
      this.ctx.lineTo(currX, currY);
      this.ctx.closePath();

      this.ctx.lineJoin = 'round';
      this.ctx.lineWidth = this.penSize;
      this.ctx.strokeStyle = this.penColor;
      this.ctx.stroke();
    }

    this.lastX = currX;
    this.lastY = currY;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
