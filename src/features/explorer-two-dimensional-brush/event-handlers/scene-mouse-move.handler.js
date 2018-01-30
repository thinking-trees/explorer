import ShapesConfig from '../core/shapes.config';
import ShapesInteractiveUtility from '../utilities/shapes-interactive-utility.class';
import GuidelinesUtility from '../utilities/guidelines-utility.class';

/**
 * Handle the mouse move event on canvas element for scene
 * @param {event}, the object of mouse move event
 * @param {sceneCtrl}, the controller of "explorerTwoDimensionalScene" component
 */
export default function mouseMoveHandler(event, sceneCtrl) {
  event.preventDefault();
  event.stopPropagation();

  let targetPoint = {
    x: event.offsetX,
    y: event.offsetY
  };

  if (sceneCtrl.scene.isShapesInSceneReadyToDrag) {
    moveSelectedShapes(targetPoint, sceneCtrl.scene);
    GuidelinesUtility.drawGuidelines(targetPoint, sceneCtrl.scene);
    sceneCtrl.scene.currentMousePoint = targetPoint;
  }
  if (sceneCtrl.scene.isShapesInSceneReadyToMultipleSelect) {
    selectShapes(targetPoint, sceneCtrl.scene);
  }

  sceneCtrl.scene.onMouseMove(event);
  sceneCtrl.scene.render();
}

function moveSelectedShapes(targetPoint, scene) {
  let mouseMoveX = targetPoint.x - scene.currentMousePoint.x;
  let mouseMoveY = targetPoint.y - scene.currentMousePoint.y;
  for (let shape of scene.shapesManager.allShapes) {
    if (shape.editable && shape.selected) {
      shape.x += mouseMoveX;
      shape.y += mouseMoveY;
      scene.stateManager.transitionToChanged();
    }
  }
}

function selectShapes(targetPoint, scene) {
  let targetArea = {
    // the value of startX is different from left side and right side while mouse is moving
    x: targetPoint.x > scene.startMousePoint.x ? scene.startMousePoint.x : targetPoint.x,
    // the value of startY is different from top side and bottom side while mouse is moving
    y: targetPoint.y > scene.startMousePoint.y ? scene.startMousePoint.y : targetPoint.y,
    width: Math.abs(targetPoint.x - scene.startMousePoint.x),
    height: Math.abs(targetPoint.y - scene.startMousePoint.y)
  };
  for (let shape of scene.shapesManager.allShapes) {
    if (ShapesInteractiveUtility.isTargetAreaOverlappingWithShape(targetArea, shape)
      && shape.editable) {
      shape.selected = true;
    } else {
      shape.selected = false;
    }
  }
  updateSelectedArea(targetArea, scene);
}

function updateSelectedArea(targetArea, scene) {
  for (let shape of scene.shapesManager.allShapes) {
    if (shape.type === ShapesConfig.selectedArea.type) {
      shape.x = targetArea.x;
      shape.y = targetArea.y;
      shape.width = targetArea.width;
      shape.height = targetArea.height;
      return true;
    }
  }
}
