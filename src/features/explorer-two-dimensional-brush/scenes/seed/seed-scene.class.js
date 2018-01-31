import Scene from '../../core/scene.class';
import ShapeFactory from '../../core/shape-factory.service';
import ShapesConfig from '../../core/shapes.config';
import UnitUtility from '../../utilities/unit-utility.class';
import * as ShapeSizes from '../../constants/shape-sizes.constant';
import _ from 'lodash';

export default class SeedScene extends Scene {
  constructor(options) {
    super(options);
    this.computePixelsPerMillimetre();
    this.setDefaultShapeSize();
  }

  initDefaultShapes() {
    this._initSceneFloor();
  }

  loadShapes() {
    super.loadShapes();
    this.initDefaultShapes();
    return this.sceneConfigRepository.loadShapes();
  }

  render() {
    this.clearScene();
    this.drawSceneBackground();
    this.shapesManager.allShapes = _.orderBy(this.shapesManager.allShapes, ['stackIndex'], ['asc']);
    for (let shape of this.shapesManager.allShapes) {
      let self = ShapeFactory.create(shape);
      self.draw();
    }
  }

  onSave() {
    return this.sceneConfigRepository.saveShapes();
  }

  computePixelsPerMillimetre() {
    this.xPixelsPerMillimetre = UnitUtility.computePixelsPerMillimetre(this.canvasWidth, this.sceneWidth);
    this.yPixelsPerMillimetre = UnitUtility.computePixelsPerMillimetre(this.canvasHeight, this.sceneHeight);
  }

  setDefaultShapeSize() {
    this.defaultShapeWidth = UnitUtility
      .convertMillimetresToPixels(ShapeSizes.DEFAULT_SHAPE_WIDTH, this.xPixelsPerMillimetre);
    this.defaultShapeHeight = UnitUtility
      .convertMillimetresToPixels(ShapeSizes.DEFAULT_SHAPE_HEIGHT, this.yPixelsPerMillimetre);
  }

  _initSceneFloor() {
    this.shapeIdCounter++;
    let sceneFloor = {
      id: `element-${this.shapeIdCounter}`,
      category: ShapesConfig.genericFloor.category,
      type: ShapesConfig.genericFloor.type,
      name: `SCENE-FLOOR-${this.shapeIdCounter}`,
      canvasContext: this.canvasContext,
      x: 0,
      y: 0,
      z: 0,
      stackIndex: 0,
      width: this.canvasWidth,
      height: this.canvasHeight,
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
      placementCategory: ShapesConfig.genericFloor.placementCategory,
      editable: ShapesConfig.genericFloor.editable
    };
    this.shapesManager.addShape(sceneFloor);
  }

} 
