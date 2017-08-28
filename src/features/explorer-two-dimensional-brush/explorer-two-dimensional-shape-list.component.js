class ExplorerTwoDimensionalShapeListController {
  constructor() {
    this.$onInit = () => {
      this.loadShapeModels();
    };
  }

  loadShapeModels() {
    this.shapeModels = [
      {name: 'FLOOR'}
    ];    
  }
}

export default {
  controller: ExplorerTwoDimensionalShapeListController,
  template: require('./explorer-two-dimensional-shape-list.component.html')
};
