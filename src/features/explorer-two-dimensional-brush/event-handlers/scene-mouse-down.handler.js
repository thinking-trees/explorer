import ShapesConfig from '../core/shapes.config';
import ShapesInteractiveUtility from '../utilities/shapes-interactive-utility.class';

/**
 * Handle the mouse down event on canvas element for scene
 * @param {event}, the object of mouse down event
 * @param {sceneCtrl}, the controller of "explorerTwoDimensionalScene" component
 */
export default function mouseDownHandler(event, sceneCtrl) {
  event.preventDefault();
  event.stopPropagation();

  let targetPoint = {
    x: event.offsetX,
    y: event.offsetY
  };
  let topShapeOnTargetPoint = ShapesInteractiveUtility.getTopShapeOnTargetPoint(targetPoint,
    sceneCtrl.scene.shapesManager.allShapes);
  if (topShapeOnTargetPoint && topShapeOnTargetPoint.selected) {
    // It's not need to update the selected status for the array of shapes
    // If the shape on target point was selected
    sceneCtrl.scene.isShapesInSceneReadyToDrag = true;
  } else {
    updateSelectedShape(topShapeOnTargetPoint, sceneCtrl.scene);
    sceneCtrl.scene.onMouseDown(event);
    sceneCtrl.scene.render();
  }

  sceneCtrl.scene.isShapesInSceneReadyToMultipleSelect = !sceneCtrl.scene.isShapesInSceneReadyToDrag;
  sceneCtrl.scene.isShapesInSceneReadyToMultipleSelect && initSelectedArea(sceneCtrl.scene);
  sceneCtrl.scene.startMousePoint = targetPoint;
  sceneCtrl.scene.currentMousePoint = targetPoint;


}

function updateSelectedShape(selectedShape, scene) {
  for (let shape of scene.shapesManager.allShapes) {
    if (selectedShape
      && selectedShape.id === shape.id
      && shape.editable) {
      shape.selected = true;
      scene.isShapesInSceneReadyToDrag = true;
    } else {
      shape.selected = false;
    }
  }
}

function initSelectedArea(scene) {
  let selectedArea = {
    id: `element-${++scene.shapeIdCounter}`,
    category: ShapesConfig.selectedArea.category,
    type: ShapesConfig.selectedArea.type,
    name: ShapesConfig.selectedArea.name,
    canvasContext: scene.canvasContext,
    x: 0,
    y: 0,
    z: 0,
    stackIndex: 9999,
    width: 0,
    height: 0,
    canvasWidth: scene.canvasWidth,
    canvasHeight: scene.canvasHeight,
    placementCategory: ShapesConfig.selectedArea.placementCategory,
    editable: ShapesConfig.selectedArea.editable
  };
  scene.shapesManager.addShape(selectedArea);
}
