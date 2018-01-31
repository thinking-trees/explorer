import ShapesConfig from './shapes.config';
import GenericFloorShape from '../shapes/generic-floor.class';
import GuidelinesXShape from '../shapes/guidelines-x.class';
import GuidelinesYShape from '../shapes/guidelines-y.class';
import SelectedArea from '../shapes/selected-area.class';
import HighlightedArea from '../shapes/highlighted-area.class';
import RackShape from '../shapes/rack.class';

const shapeFactory = {};

shapeFactory.create = shape => {
  let shapeInstance;

  switch (shape.type) {
  case ShapesConfig.genericFloor.type:
    shapeInstance = new GenericFloorShape(shape);
    break;
  case ShapesConfig.guidelinesX.type:
    shapeInstance = new GuidelinesXShape(shape);
    break;
  case ShapesConfig.guidelinesY.type:
    shapeInstance = new GuidelinesYShape(shape);
    break;
  case ShapesConfig.selectedArea.type:
    shapeInstance = new SelectedArea(shape);
    break;
  case ShapesConfig.highlightedArea.type:
    shapeInstance = new HighlightedArea(shape);
    break;
  case ShapesConfig.rack.type:
    shapeInstance = new RackShape(shape);
    break;
  default:
    shapeInstance = void 0;
    break;
  }

  return shapeInstance;
};

export default shapeFactory;
