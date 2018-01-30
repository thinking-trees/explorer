import ShapesInteractiveUtility from './shapes-interactive-utility.class';

export default class SceneUtility {
  static updateSnappingShapes(scene) {
    for (let shape of scene.shapesManager.allShapes) {
      if (shape.selected) {
        ShapesInteractiveUtility.snapToShape(shape, scene.shapesManager.allShapes);
        SceneUtility.ensureShapeNotBreakingBoundsOfScene(shape, scene);
      }
    }
  }

  static ensureShapeNotBreakingBoundsOfScene(shape, scene) {
    if (shape.x < 0) {
      shape.x = 0;
    }
    if (shape.x + shape.width > scene.canvasWidth) {
      shape.x = scene.canvasWidth - shape.width;
    }
    if (shape.y < 0) {
      shape.y = 0;
    }
    if (shape.y + shape.height > scene.canvasHeight) {
      shape.y = scene.canvasHeight - shape.height;
    }
  }
}
