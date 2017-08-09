class ExplorerTwoDimensionalBrushPortalController {
  constructor() {
    this.$onInit = () => {
      
    };
  }
}

export default {
  controller: ExplorerTwoDimensionalBrushPortalController,
  template: `
    <div class="row">
      <div class="col-md-3">
        <explorer-two-dimensional-shape-list></explorer-two-dimensional-shape-list>
      </div>
      <div class="col-md-9">
        <explorer-two-dimensional-scene></explorer-two-dimensional-scene>
      </div>
    </div>
  `
};
