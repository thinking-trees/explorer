import ShapesConfig from '../core/shapes.config';
import SceneUtility from '../utilities/scene-utility.class';
import GuidelinesUtility from '../utilities/guidelines-utility.class';

/**
 * Handle the mouse up event on canvas element for scene
 * @param {event}, the object of mouse up event
 * @param {scene}, the instance of scene class
 */
export default function mouseUpHandler(event, scene) {
  event.preventDefault();
  event.stopPropagation();

  scene.onMouseUp(event);
  scene.isShapesInSceneReadyToDrag && SceneUtility.updateSnappingShapes(scene);
  scene.isShapesInSceneReadyToDrag && GuidelinesUtility.resetGuidelinesXAndGuidelinesY(scene);
  scene.isShapesInSceneReadyToDrag = false;
  scene.isShapesInSceneReadyToMultipleSelect && scene.shapesManager.deleteShapeByType(ShapesConfig.selectedArea.type);
  scene.isShapesInSceneReadyToMultipleSelect = false;
  scene.render();
}
