export default class Shape {
  constructor(options) {
    this.type = options.type;
    this.context = options.canvasContext;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.rotation = options.rotation || 0;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.contextWidth = options.canvasWidth;
    this.contextHeight = options.canvasHeight;
  }

  draw() {
    return true;
  }

  /*
   * Restore settings of current context to default after drawing is finished
   * if there is any change here
   */
  restoreContext() {
    this.context.lineWidth = 1;
    this.context.strokeStyle = '#000000';
    this.context.fillStyle = '#000000';
    this.context.globalAlpha = 1;
    this.context.setLineDash([]);
  }

}
