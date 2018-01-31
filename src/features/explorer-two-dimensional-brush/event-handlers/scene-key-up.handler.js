import SceneUtility from '../utilities/scene-utility.class';

/**
 * Handle the keyup event on canvas element for scene
 * @param {event}, the object of key up event
 * @param {sceneCtrl}, the controller of "explorerTwoDimensionalScene" component
 */
export default function keyUpHandler(event, sceneCtrl) {
  event.preventDefault();
  event.stopPropagation();

  let keyName = event.key;
  let keyCode = event.which || event.keyCode || event.charCode;
  if ('Delete' === keyName || 46 === keyCode) {
    deleteSelectedShapes(sceneCtrl);
  }

  sceneCtrl.scene.onKeyUp(event);
  SceneUtility.updateSnappingShapes(sceneCtrl.scene);
  sceneCtrl.scene.render();
}

function deleteSelectedShapes(sceneCtrl) {
  let deletedShapes = [];
  for (let shape of sceneCtrl.scene.shapesManager.allShapes) {
    if (shape.selected) {
      deletedShapes.push(shape);
    }
  }
  for (let deletedShape of deletedShapes) {
    sceneCtrl.scene.shapesManager.deleteShape(deletedShape.id);
    sceneCtrl.scene.shapesManager.addDeletedShape(deletedShape);
    sceneCtrl.scene.stateManager.transitionToChanged();
  }
}
