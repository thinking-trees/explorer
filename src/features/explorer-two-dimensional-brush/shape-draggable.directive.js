import ShapeFactory from './core/shape-factory.service';
import ScenesManager from './core/scenes-manager.class';
import DraggingShape from './constants/dragging-shape.constant';
import * as ShapeSizes from './constants/shape-sizes.constant';
import UnitUtility from './utilities/unit-utility.class';

function shapeDraggableDirectiveFactory() {
  return {
    restrict: 'A',
    link: (scope, element, attributes) => {
      let shapeModel = element[0];
      shapeModel.draggable = true;

      shapeModel.addEventListener('dragstart', ev => {
        ev.dataTransfer.effectAllowed = 'copy';
        ev.dataTransfer.setData('shapeCategory', attributes.shapeCategory);
        ev.dataTransfer.setData('shapeType', attributes.shapeType);
        ev.dataTransfer.setData('shapeName', attributes.shapeName);
        ev.dataTransfer.setData('shapeEditable', attributes.shapeEditable);
        ev.dataTransfer.setData('shapePlacementCategory', attributes.shapePlacementCategory);
        ev.dataTransfer.setData('shapeWidth', attributes.shapeWidth);
        ev.dataTransfer.setData('shapeHeight', attributes.shapeHeight);

        setDragImage(attributes, ev.dataTransfer);
        setDraggingShape(attributes);
      });

      shapeModel.addEventListener('dragend', () => {
        clearDraggingShape();
      });

      function setDragImage(attributes, dataTransfer) {
        let currentScene = ScenesManager.getCurrentScene();
        let canvasForDraggingImage = document.createElement('canvas');
        let imageWidth = attributes.shapeWidth || ShapeSizes.DEFAULT_SHAPE_WIDTH; // Unit: mm
        let imageHeight = attributes.shapeHeight || ShapeSizes.DEFAULT_SHAPE_HEIGHT; // Unit: mm
        canvasForDraggingImage.width = UnitUtility
          .convertMillimetresToPixels(imageWidth, currentScene.xPixelsPerMillimetre);
        canvasForDraggingImage.height = UnitUtility
          .convertMillimetresToPixels(imageHeight, currentScene.yPixelsPerMillimetre);
        drawDraggingImage(canvasForDraggingImage);

        let draggingImage = new Image();
        draggingImage.src = canvasForDraggingImage.toDataURL('image/png');
        dataTransfer.setDragImage(draggingImage, 0, 0);
      }

      function drawDraggingImage(canvasForDraggingImage) {
        let shapeDragging = ShapeFactory.create({
          type: attributes.shapeType,
          canvasContext: canvasForDraggingImage.getContext('2d'),
          x: 0,
          y: 0,
          width: canvasForDraggingImage.width,
          height: canvasForDraggingImage.height
        });
        shapeDragging.draw();
      }

      function setDraggingShape(attributes) {
        DraggingShape.id = attributes.shapeId;
        DraggingShape.category = attributes.shapeCategory;
        DraggingShape.type = attributes.shapeType;
        DraggingShape.name = attributes.shapeName;
        DraggingShape.editable = attributes.shapeEditable;
        DraggingShape.placementCategory = attributes.placementCategory;
        DraggingShape.width = attributes.shapeWidth;
        DraggingShape.height = attributes.shapeHeight;
      }

      function clearDraggingShape() {
        delete DraggingShape.id;
        delete DraggingShape.category;
        delete DraggingShape.type;
        delete DraggingShape.name;
        delete DraggingShape.editable;
        delete DraggingShape.placementCategory;
        delete DraggingShape.width;
        delete DraggingShape.height;
      }

    }
  };
}

export default shapeDraggableDirectiveFactory;
