import Shape from './shape.class';

export default class EditableShape extends Shape {
  constructor(options) {
    super(options);
    this.selected = options.selected;
  }

  select() {
    let lineWidth = 3;
    let rectToStroke = {
      x: this.x + lineWidth / 2,
      y: this.y + lineWidth / 2,
      width: this.width - lineWidth,
      height: this.height - lineWidth
    };
    this.context.strokeStyle = '#0275d8';
    this.context.lineWidth = lineWidth;
    this.context.strokeRect(rectToStroke.x, rectToStroke.y, rectToStroke.width, rectToStroke.height);

    this.restoreContext();
  }

}
