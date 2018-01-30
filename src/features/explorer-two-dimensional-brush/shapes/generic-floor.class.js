import Shape from '../core/shape.class';

export default class GenericFloor extends Shape {
  constructor(options) {
    super(options);
    this.floorColumns = ~~(options.width / 50);
    this.floorRows = ~~(options.height / 50);
    this.strokeStyle = '#eceeef';
  }

  draw() {
    this.context.strokeStyle = this.strokeStyle;

    let tileWidth = this.width / this.floorColumns;
    let tileHeight = this.height / this.floorRows;
    for (let row = 0; row < this.floorRows; row++) {
      this._drawTilesInRow(tileWidth, tileHeight, this.y + tileHeight * row);
    }

    this.restoreContext();
  }

  _drawTilesInRow(tileWidth, tileHeight, y) {
    for (let column = 0; column < this.floorColumns; column++) {
      this._drawTile({
        x: this.x + tileWidth * column,
        y: y,
        width: tileWidth,
        height: tileHeight
      });
    }
  }

  _drawTile(options) {
    this.context.strokeRect(options.x, options.y, options.width, options.height);
  }

}
