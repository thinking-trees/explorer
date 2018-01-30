import Shape from '../core/shape.class';

export default class GuidelinesY extends Shape {
  constructor(options) {
    super(options);
  }

  draw() {
    this.context.setLineDash([7, 7]);
    this.context.strokeStyle = '#818a91';
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.x, this.y + this.height);
    this.context.closePath();
    this.context.stroke();

    this.restoreContext();
  }

}
