import Shape from '../core/shape.class';

export default class HighlightedArea extends Shape {
  constructor(options) {
    super(options);
  }

  draw() {
    this._strokeHighlightedArea();
    this.restoreContext();
  }

  _strokeHighlightedArea() {
    this.context.setLineDash([7, 7]);
    this.context.lineWidth = 2;
    this.context.strokeStyle = '#0275d8';
    this.context.strokeRect(this.x, this.y, this.width, this.height);
  }

}
