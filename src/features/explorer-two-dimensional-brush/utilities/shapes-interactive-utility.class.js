import _ from 'lodash';
import ShapeCategories from '../core/shape-categories.enum';
import ShapePlacementCategories from '../core/shape-placement-categories.enum';

/**
 * It works for the shapes interactive.
 * The shape would be treat as rectangle.
 * Calculate the Relationships between Target Point and Each Shape.
 */
export default class ShapesInteractiveUtility {
  static isTargetPointDropOnShape(targetPoint, shape) {
    let isTargetPointXDropOnShape = targetPoint.x >= shape.x && targetPoint.x <= shape.x + shape.width;
    let isTargetPointYDropOnShape = targetPoint.y >= shape.y && targetPoint.y <= shape.y + shape.height;
    return isTargetPointXDropOnShape && isTargetPointYDropOnShape;
  }

  static catchShapesOnTargetPoint(targetPoint, shapes, ignoreGuidelinesShapes) {
    let shapesOnTargetPoint = [];
    for (let shape of shapes) {
      if (ignoreGuidelinesShapes && ShapeCategories.guidelines === shape.category) {
        continue;
      }
      ShapesInteractiveUtility.isTargetPointDropOnShape(targetPoint, shape) && shapesOnTargetPoint.push(shape);
    }
    return shapesOnTargetPoint;
  }

  static getTopShapeOnTargetPoint(targetPoint, shapes, ignoreGuidelinesShapes = true) {
    let shapesOnTargetPoint = ShapesInteractiveUtility.catchShapesOnTargetPoint(targetPoint, shapes, ignoreGuidelinesShapes);
    let topShapeOnTargetPoint = _.maxBy(shapesOnTargetPoint, 'stackIndex');
    return topShapeOnTargetPoint;
  }

  static isTopShapeOnTargetPoint(targetPoint, shapeId, shapes) {
    let topShapeOnTargetPoint = ShapesInteractiveUtility.getTopShapeOnTargetPoint(targetPoint, shapes);
    let result = topShapeOnTargetPoint ? topShapeOnTargetPoint.id === shapeId : false;
    return result;
  }

  static isTargetAreaOverlappingWithShape(targetArea, shape) {
    let isTargetAreaOverlappingWithShapeOnXAxis = false;
    let isTargetAreaOverlappingWithShapeOnYAxis = false;

    // Calculate the width(maxX - minX) that can cover the target area and shape
    // The sum of target area's width and shape's width should larger than (maxX - minX)
    // If they are overlapping
    let minX = _.min([targetArea.x, shape.x]);
    let maxX = _.max([targetArea.x + targetArea.width, shape.x + shape.width]);
    isTargetAreaOverlappingWithShapeOnXAxis = targetArea.width  + shape.width > maxX - minX;

    // Calculate the height(maxY - minY) that can cover the target area and shape
    // The sum of target area's height and shape's height should larger than (maxY - minY)
    // If they are overlapping
    let minY = _.min([targetArea.y, shape.y]);
    let maxY = _.max([targetArea.y + targetArea.height, shape.y + shape.height]);
    isTargetAreaOverlappingWithShapeOnYAxis = targetArea.height + shape.height > maxY - minY;

    return isTargetAreaOverlappingWithShapeOnXAxis && isTargetAreaOverlappingWithShapeOnYAxis;
  }

  static calculateOverlappingAreaWithShapeOnTargetArea(targetArea, shape) {
    // Area in which target area overlapping with the shape
    let overlappingArea = 0;

    let minX = _.min([targetArea.x, shape.x]);
    let maxX = _.max([targetArea.x + targetArea.width, shape.x + shape.width]);
    let overlappingWidth = (targetArea.width  + shape.width) - (maxX - minX);
    if (overlappingWidth <= 0) {
      // Target area doesn't overlapping with the shape
      return overlappingArea;
    }

    let minY = _.min([targetArea.y, shape.y]);
    let maxY = _.max([targetArea.y + targetArea.height, shape.y + shape.height]);
    let overlappingHeight = (targetArea.height + shape.height) - (maxY - minY);
    if (overlappingHeight <= 0) {
      // Target area doesn't overlapping with the shape
      return overlappingArea;
    }

    overlappingArea = overlappingWidth * overlappingHeight;
    return overlappingArea;
  }

  static catchShapesOnTargetArea(targetArea, shapes) {
    let shapesOnTargetArea = [];

    for (let shape of shapes) {
      ShapesInteractiveUtility.isTargetAreaOverlappingWithShape(targetArea, shape) && shapesOnTargetArea.push(shape);
    }

    return shapesOnTargetArea;
  }

  static calculateMaxStackIndexOnTargetArea(targetArea, shapes) {
    let shapesOnTargetArea = ShapesInteractiveUtility.catchShapesOnTargetArea(targetArea, shapes);
    let shapeWithMaxStackIndexOnTargetArea = _.maxBy(shapesOnTargetArea, 'stackIndex');
    let maxStackIndex = shapeWithMaxStackIndexOnTargetArea ? shapeWithMaxStackIndexOnTargetArea.stackIndex : 1;
    return maxStackIndex;
  }

  /**
   * Catch the shape with the max overlapping area on target area
   * @param {targetArea}, includes following properties: x, y, with, height
   * @param {shapes}, an array of shapes that would be iterated
   * @param {placementCategoryForCatchingShape}, optional, only catch the shape defined as this placement category
   */
  static catchShapeWithMaxOverlappingAreaOnTargetArea(targetArea, shapes, placementCategoryForCatchingShape) {
    let shapeWithMaxOverlappingArea = null;
    // Set it to 1 instead of 0 to avoid being too sensitive
    // when user doesn't want to snap the shape to the closed shape
    let maxOverlappingArea = 1;
    for (let shape of shapes) {
      if (targetArea.id && targetArea.id === shape.id) {
        // targetArea actually is a shape and same to current shape, ignore current shape
        continue;
      }

      if (placementCategoryForCatchingShape && shape.placementCategory !== placementCategoryForCatchingShape) {
        continue;
      }

      let currentOverlappingArea = ShapesInteractiveUtility.calculateOverlappingAreaWithShapeOnTargetArea(targetArea, shape);
      if (currentOverlappingArea > maxOverlappingArea) {
        shapeWithMaxOverlappingArea = shape;
        maxOverlappingArea = currentOverlappingArea;
      }
    }

    return shapeWithMaxOverlappingArea;
  }

  /**
   * Make snapping shape align with snapped shape
   * It would catch the shape with the max overlapping area with snapping shape as the snapped shape
   * @param {snappingShape}, the shape object dragging or dropped or selected, it will try to snap to snapped shape
   * @param {shapes}, an array of shapes that would be iterated
   * @param {direction}, optional, it can be undefined, left or right, used for below situation:
   *         the start point of snapping shape is equal to snapped shape
   */
  static snapToShape(snappingShape, shapes, direction) {
    if (!snappingShape.editable
      || snappingShape.placementCategory !== ShapePlacementCategories.floor) {
      // Snap to shape is apply for which placement category is ShapePlacementCategories.floor
      return false;
    }

    let snappedShape = ShapesInteractiveUtility.catchShapeWithMaxOverlappingAreaOnTargetArea(snappingShape,
      shapes, snappingShape.placementCategory);
    if (!snappedShape) {
      return false;
    }

    if (snappingShape.x > snappedShape.x) {
      direction = 'right';
      ShapesInteractiveUtility.snapToShapeOnRightSide(snappingShape, snappedShape);
    } else if (snappingShape.x === snappedShape.x) {
      direction === 'left' && ShapesInteractiveUtility.snapToShapeOnLeftSide(snappingShape, snappedShape);
      // Default: Snap to right side if the start point of snapping shape is equal to snapped shape
      direction !== 'left' && ShapesInteractiveUtility.snapToShapeOnRightSide(snappingShape, snappedShape);
    } else {
      direction = 'left';
      ShapesInteractiveUtility.snapToShapeOnLeftSide(snappingShape, snappedShape);
    }

    snappingShape = ShapesInteractiveUtility.catchShapeWithMaxOverlappingAreaOnTargetArea(snappingShape,
      shapes, snappingShape.placementCategory);
    if (snappingShape) {
      ShapesInteractiveUtility.snapToShape(snappingShape, shapes, direction);
    }
  }

  static snapToShapeOnLeftSide(snappingShape, snappedShape) {
    snappingShape.x = snappedShape.x - snappingShape.width;
    snappingShape.y = snappedShape.y;
  }

  static snapToShapeOnRightSide(snappingShape, snappedShape) {
    snappingShape.x = snappedShape.x + snappedShape.width;
    snappingShape.y = snappedShape.y;
  }

}
