import Shape from '../core/shape.class';

export default class SelectedArea extends Shape {
  constructor(options) {
    super(options);
  }

  draw() {
    this._strokeSelectedArea();
    this._fillSelectedArea();
    this.restoreContext();
  }

  _strokeSelectedArea() {
    this.context.setLineDash([7, 7]);
    this.context.strokeStyle = '#0275d8';
    this.context.strokeRect(this.x, this.y, this.width, this.height);
  }

  _fillSelectedArea() {
    this.context.fillStyle = '#0275d8';
    this.context.globalAlpha = 0.2;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

}
