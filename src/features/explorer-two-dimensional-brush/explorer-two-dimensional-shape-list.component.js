import _ from 'lodash';
import ShapesConfig from './core/shapes.config';

class ExplorerTwoDimensionalShapeListController {
  constructor() {
    this.$onInit = () => {
      this.loadShapeList();
    };
  }

  loadShapeList() {
    this.shapeList = _.filter(ShapesConfig, {displayInShapeList: true});
    this.shapeList = _.groupBy(this.shapeList, shape => shape.category);
  }

  selectCategory(category) {
    if (this.isCurrentCategoryOpened(category)) {
      this.currentActivedCategory = '';
      return false;
    }
    this.currentActivedCategory = category;
  }

  isCurrentCategoryOpened(category) {
    return category === this.currentActivedCategory;
  }
}

export default {
  controller: ExplorerTwoDimensionalShapeListController,
  template: require('./explorer-two-dimensional-shape-list.component.html')
};
