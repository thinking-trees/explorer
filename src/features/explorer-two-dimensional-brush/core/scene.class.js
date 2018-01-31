import SceneStateManager from './scene-state-manager.class';
import ShapesConfig from './shapes.config';
import ShapesManager from './shapes-manager.class';

export default class Scene {
  constructor(options) {
    this.stateManager = new SceneStateManager();
    this.shapeIdCounter = 0;
    this.canvasContext = options.canvasContext;
    this.canvasWidth = options.canvasWidth;
    this.canvasHeight = options.canvasHeight;
    this.sceneWidth = options.sceneWidth || 600 * 15; // Unit: mm
    this.sceneHeight = options.sceneHeight || 1500 * 5; // Unit: mm
    this.defaultShapeWidth = options.defaultShapeWidth || 100;
    this.defaultShapeHeight = options.defaultShapeHeight || 100;
    this.xPixelsPerMillimetre = options.xPixelsPerMillimetre || 1;
    this.yPixelsPerMillimetre = options.yPixelsPerMillimetre || 1;
    this.shapesManager = new ShapesManager();
    // mark the point where mouse down is
    this.startMousePoint = {};
    // mark the point where mouse is focusing
    this.currentMousePoint = {};
    // mark the elements in space is ready to drag or not
    this.isShapesInSceneReadyToDrag = false;
    // mark the action for mouse move should be multiple elements selected
    this.isShapesInSceneReadyToMultipleSelect = false;
    // provide services for loading and saving scene config
    this.sceneConfigRepository = options.sceneConfigRepository;
    // list of actions for current scene
    // action: {tooltip: string, icon: string, do: function}
    this.actions = [];
  }

  loadShapes() {
    this._initGuidelinesX();
    this._initGuidelinesY();
    this._initHighlightedArea();
    // Return a Promise by its derived class finally
  }

  render() {
    return true;
  }

  clearScene() {
    this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  drawSceneBackground() {
    this.canvasContext.fillStyle = '#f7f7f9';
    this.canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  onSave() {}

  onMouseDown(event) {}

  onMouseMove(event) {}

  onMouseUp(event) {}

  onDoubleClick(event) {}

  onKeyDown(event) {}

  onKeyUp(event) {}

  onShapeModelDragOver(event, shape) {}

  onShapeModelDropped(event, shape) {}

  _initGuidelinesX() {
    this.shapeIdCounter++;
    let guidelinesX = {
      id: `element-${this.shapeIdCounter}`,
      category: ShapesConfig.guidelinesX.category,
      type: ShapesConfig.guidelinesX.type,
      name: `${ShapesConfig.guidelinesX.name}-${this.shapeIdCounter}`,
      canvasContext: this.canvasContext,
      x: 0,
      y: 0,
      stackIndex: 9999,
      width: 0,
      height: 0,
      editable: ShapesConfig.guidelinesX.editable
    };
    this.shapesManager.addShape(guidelinesX);
  }

  _initGuidelinesY() {
    this.shapeIdCounter++;
    let guidelinesY = {
      id: `element-${this.shapeIdCounter}`,
      category: ShapesConfig.guidelinesY.category,
      type: ShapesConfig.guidelinesY.type,
      name: `${ShapesConfig.guidelinesY.name}-${this.shapeIdCounter}`,
      canvasContext: this.canvasContext,
      x: 0,
      y: 0,
      stackIndex: 9999,
      width: 0,
      height: 0,
      editable: ShapesConfig.guidelinesY.editable
    };
    this.shapesManager.addShape(guidelinesY);
  }

  _initHighlightedArea() {
    let highlightedArea = {
      id: `element-${++this.shapeIdCounter}`,
      category: ShapesConfig.highlightedArea.category,
      type: ShapesConfig.highlightedArea.type,
      name: ShapesConfig.highlightedArea.name,
      canvasContext: this.canvasContext,
      x: 0,
      y: 0,
      stackIndex: 9999,
      width: 0,
      height: 0,
      editable: ShapesConfig.highlightedArea.editable
    };
    this.shapesManager.addShape(highlightedArea);
  }

}
