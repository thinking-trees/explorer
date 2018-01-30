import _ from 'lodash';
import ShapesConfig from './shapes.config';

export default class ShapesManager {
  constructor() {
    this.allShapes = [];
    this.deletedShapes = [];
  }

  addShape(shape) {
    this.allShapes.push(shape);
  }

  addShapes(shapes) {
    [].push.apply(this.allShapes, shapes);
  }

  addDeletedShape(shape) {
    this.deletedShapes.push(shape);
  }

  updateShape(updatedShape) {
    for (let shape of this.allShapes) {
      if (shape.id === updatedShape.id) {
        _.assign(shape, updatedShape);
        return true;
      }
    }
  }

  updateShapeByType(shapeType, updatedShapeOptions) {
    for (let shape of this.allShapes) {
      if (shape.type === shapeType) {
        _.assign(shape, updatedShapeOptions);
      }
    }
  }

  deleteShape(shapeId) {
    _.remove(this.allShapes, shape => shape.id === shapeId);
  }

  deleteShapeByType(shapeType) {
    _.remove(this.allShapes, shape => shape.type === shapeType);
  }

  clearDeletedShapes() {
    this.deletedShapes.splice(0);
  }

  getShape(shapeId) {
    _.find(this.allShapes, shape => shape.id === shapeId);
  }

  /*
   * Generate the ID assigned to new shape
   * This method would ensure the ID of shape is same to its index in the array of shapes
   */
  generateIdForNewShape() {
    return this.allShapes.length;
  }

  updateGuidelinesX(y, width) {
    for (let shape of this.allShapes) {
      if (shape.type === ShapesConfig.guidelinesX.type) {
        shape.y = y;
        shape.width = width;
        return true;
      }
    }
  }

  updateGuidelinesY(x, height) {
    for (let shape of this.allShapes) {
      if (shape.type === ShapesConfig.guidelinesY.type) {
        shape.x = x;
        shape.height = height;
        return true;
      }
    }
  }

}
