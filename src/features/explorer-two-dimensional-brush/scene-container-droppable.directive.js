import DraggingShape from './constants/dragging-shape.constant';

function sceneContainerDroppableDirectiveFactory() {
  return {
    restrict: 'A',
    link: (scope, element) => {
      var sceneContainer = element[0];

      sceneContainer.addEventListener('dragover', ev => {
        if (!DraggingShape.type) {
          // Do nothing when the shape type is invalid
          return false;
        }
        ev.preventDefault();
        ev.dataTransfer.dropEffect = 'copy';

        scope.$emit('explorerShapeModelDragOver', {
          category: DraggingShape.category,
          type: DraggingShape.type,
          name: DraggingShape.name,
          x: ev.offsetX,
          y: ev.offsetY,
          editable: DraggingShape.editable,
          placementCategory: DraggingShape.placementCategory,
          width: DraggingShape.width,
          height: DraggingShape.height
        });
      });

      sceneContainer.addEventListener('drop',  ev => {
        let shapeType = ev.dataTransfer.getData('shapeType');
        if (!shapeType) {
          // Do nothing when the shape type is invalid
          return false;
        }
        ev.stopPropagation();

        scope.$emit('explorerShapeModelDropped', {
          category: ev.dataTransfer.getData('shapeCategory'),
          type: shapeType,
          name: ev.dataTransfer.getData('shapeName'),
          x: ev.offsetX,
          y: ev.offsetY,
          editable: ev.dataTransfer.getData('shapeEditable'),
          placementCategory: ev.dataTransfer.getData('shapePlacementCategory'),
          width: ev.dataTransfer.getData('shapeWidth'),
          height: ev.dataTransfer.getData('shapeHeight')
        });
      });

    }
  };
}

export default sceneContainerDroppableDirectiveFactory;
