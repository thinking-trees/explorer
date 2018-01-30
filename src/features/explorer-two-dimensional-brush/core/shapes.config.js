import ShapeCategories from './shape-categories.enum';
import ShapePlacementCategories from './shape-placement-categories.enum';
import * as ShapeSizes from '../constants/shape-sizes.constant';

export default {
  genericFloor: {
    category: ShapeCategories.floor,
    type: 'GENERIC_FLOOR',
    name: 'Generic Floor',
    editable: false,
    placementCategory: ShapePlacementCategories.freedom,
    displayInShapeList: false
  },
  guidelinesX: {
    category: ShapeCategories.guidelines,
    type: 'GUIDELINES_X',
    name: 'Guidelines X',
    editable: false,
    placementCategory: ShapePlacementCategories.freedom,
    displayInShapeList: false
  },
  guidelinesY: {
    category: ShapeCategories.guidelines,
    type: 'GUIDELINES_Y',
    name: 'Guidelines Y',
    editable: false,
    placementCategory: ShapePlacementCategories.freedom,
    displayInShapeList: false
  },
  selectedArea: {
    category: ShapeCategories.guidelines,
    type: 'SELECTED_AREA',
    name: 'Selected Area',
    editable: false,
    placementCategory: ShapePlacementCategories.freedom,
    displayInShapeList: false
  },
  highlightedArea: {
    category: ShapeCategories.guidelines,
    type: 'HIGHLIGHTED_AREA',
    name: 'Highlighted Area',
    editable: false,
    placementCategory: ShapePlacementCategories.freedom,
    displayInShapeList: false
  },
  rack: {
    category: ShapeCategories.cabinet,
    type: 'RACK',
    name: 'Rack',
    editable: true,
    placementCategory: ShapePlacementCategories.floor,
    displayInShapeList: true,
    width: ShapeSizes.DEFAULT_SHAPE_WIDTH, // Unit: mm
    height: ShapeSizes.DEFAULT_SHAPE_HEIGHT // Unit: mm
  }
};
