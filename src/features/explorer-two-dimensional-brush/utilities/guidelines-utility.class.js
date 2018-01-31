import ShapesInteractiveUtility from './shapes-interactive-utility.class';
import ShapeCategories from '../core/shape-categories.enum';

export default class GuidelinesUtility {
  static drawGuidelines(targetPoint, scene) {
    let targetShape = ShapesInteractiveUtility.getTopShapeOnTargetPoint(targetPoint,
      scene.shapesManager.allShapes);
    if (!targetShape) {
      return false;
    }
    let isDrawGuidelinesX = false;
    let isDrawGuidelinesY = false;
    for (let shape of scene.shapesManager.allShapes) {
      if (shape.selected || ShapeCategories.guidelines === shape.category) {
        continue;
      }

      if (GuidelinesUtility.isAlignmentWithEachOther(shape.x, targetShape.x)
        || GuidelinesUtility.isAlignmentWithEachOther(shape.x, targetShape.x + targetShape.width)) {
        scene.shapesManager.updateGuidelinesY(shape.x, scene.canvasHeight);
        isDrawGuidelinesY = true;
      }

      if (GuidelinesUtility.isAlignmentWithEachOther(shape.x + shape.width, targetShape.x)) {
        scene.shapesManager.updateGuidelinesY(targetShape.x, scene.canvasHeight);
        isDrawGuidelinesY = true;
      }

      if (GuidelinesUtility.isAlignmentWithEachOther(shape.y, targetShape.y)
        || GuidelinesUtility.isAlignmentWithEachOther(shape.y, targetShape.y + targetShape.height)) {
        scene.shapesManager.updateGuidelinesX(shape.y, scene.canvasWidth);
        isDrawGuidelinesX = true;
      }

      if (GuidelinesUtility.isAlignmentWithEachOther(shape.y + shape.height, targetShape.y)) {
        scene.shapesManager.updateGuidelinesX(targetShape.y, scene.canvasWidth);
        isDrawGuidelinesX = true;
      }
    }

    if (!isDrawGuidelinesX) {
      scene.shapesManager.updateGuidelinesX(0, 0);
    }
    if (!isDrawGuidelinesY) {
      scene.shapesManager.updateGuidelinesY(0, 0);
    }
  }

  static isAlignmentWithEachOther(positionA, positionB) {
    let offset = Math.abs(positionA - positionB);
    if (Math.ceil(offset) < 2) {
      return true;
    } else {
      return false;
    }
  }

  static resetGuidelinesXAndGuidelinesY(scene) {
    scene.shapesManager.updateGuidelinesX(0, 0);
    scene.shapesManager.updateGuidelinesY(0, 0);
  }

}
