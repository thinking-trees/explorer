import EditableShape from '../core/editable-shape.class';

export default class Rack extends EditableShape {
  constructor(options) {
    super(options);
  }

  draw() {
    this._fillRect();
    this._strokeRect();
    this._drawText();
    this.restoreContext();
    this.selected && this.select();
  }

  _fillRect() {
    this.context.fillStyle = '#000000';
    this.context.globalAlpha = 0.3;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  _strokeRect() {
    let lineWidth = 3;
    let rectToStroke = {
      x: this.x + lineWidth / 2,
      y: this.y + lineWidth / 2,
      width: this.width - lineWidth,
      height: this.height - lineWidth
    };
    this.context.strokeStyle = '#818a91';
    this.context.lineWidth = lineWidth;
    this.context.globalAlpha = 1;
    this.context.strokeRect(rectToStroke.x, rectToStroke.y, rectToStroke.width, rectToStroke.height);
  }

  _drawText() {
    let fontSize = 30;
    let startPoint = {
      x: this.x + this.width / 2 - fontSize / 3,
      y: this.y + this.height / 2 + fontSize / 3
    };
    this.context.fillStyle = '#0275d8';
    this.context.font = `${fontSize}px Verdana`;
    this.context.fillText('R', startPoint.x, startPoint.y);
  }

}
