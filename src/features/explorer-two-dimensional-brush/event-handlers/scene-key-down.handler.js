/**
 * Handle the keydown event on canvas element for scene
 * @param {event}, the object of key down event
 * @param {sceneCtrl}, the controller of "explorerTwoDimensionalScene" component
 */
export default function keyDownHandler(event, sceneCtrl) {
  event.preventDefault();
  event.stopPropagation();

  let keyName = event.key;
  let keyCode = event.which || event.keyCode || event.charCode;
  if ('ArrowUp' === keyName || 38 === keyCode) {
    moveSelectedShapesUp(sceneCtrl);
  } else if ('ArrowRight' === keyName || 39 === keyCode) {
    moveSelectedShapesRight(sceneCtrl);
  } else if ('ArrowDown' === keyName || 40 === keyCode) {
    moveSelectedShapesDown(sceneCtrl);
  } else if ('ArrowLeft' === keyName || 37 === keyCode) {
    moveSelectedShapesLeft(sceneCtrl);
  }

  sceneCtrl.scene.onKeyDown(event);
  sceneCtrl.scene.render();
}

function moveSelectedShapesLeft(sceneCtrl) {
  for (let shape of sceneCtrl.scene.shapesManager.allShapes) {
    if (shape.editable && shape.selected) {
      shape.x -= 1;
      sceneCtrl.scene.stateManager.transitionToChanged();
    }
  }
}

function moveSelectedShapesRight(sceneCtrl) {
  for (let shape of sceneCtrl.scene.shapesManager.allShapes) {
    if (shape.editable && shape.selected) {
      shape.x += 1;
      sceneCtrl.scene.stateManager.transitionToChanged();
    }
  }
}

function moveSelectedShapesUp(sceneCtrl) {
  for (let shape of sceneCtrl.scene.shapesManager.allShapes) {
    if (shape.editable && shape.selected) {
      shape.y -= 1;
      sceneCtrl.scene.stateManager.transitionToChanged();
    }
  }
}

function moveSelectedShapesDown(sceneCtrl) {
  for (let shape of sceneCtrl.scene.shapesManager.allShapes) {
    if (shape.editable && shape.selected) {
      shape.y += 1;
      sceneCtrl.scene.stateManager.transitionToChanged();
    }
  }
}
