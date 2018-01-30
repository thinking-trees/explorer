import ShapeCategories from '../core/shape-categories.enum';
import ShapesInteractiveUtility from '../utilities/shapes-interactive-utility.class';

/**
 * Handle the dblclick event on canvas element for scene
 * @param: {event}, the object of double click event
 * @param: {sceneCtrl}, the controller of "explorerTwoDimensionalScene" component
 */
export default function doubleClickHandler(event, sceneCtrl) {
  event.preventDefault();
  event.stopPropagation();

  let targetPoint = {
    x: event.offsetX,
    y: event.offsetY
  };
  let topShapeOnTargetPoint = ShapesInteractiveUtility.getTopShapeOnTargetPoint(targetPoint,
    sceneCtrl.scene.shapesManager.allShapes);
  if (topShapeOnTargetPoint
    && topShapeOnTargetPoint.category !== ShapeCategories.floor
    && topShapeOnTargetPoint.category !== ShapeCategories.guidelines) {
    // Can do some shape config works here
    updateSelectedShape(topShapeOnTargetPoint, sceneCtrl.scene);
    sceneCtrl.currentSelectedShape = topShapeOnTargetPoint;
    sceneCtrl.scene.onDoubleClick(event);
    sceneCtrl.scene.render();
  }
}

function updateSelectedShape(selectedShape, scene) {
  for (let shape of scene.shapesManager.allShapes) {
    if (selectedShape
      && selectedShape.id === shape.id
      && shape.editable) {
      shape.selected = true;
    } else {
      shape.selected = false;
    }
  }
}
