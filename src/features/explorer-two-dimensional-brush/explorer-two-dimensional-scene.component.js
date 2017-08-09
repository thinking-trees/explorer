class ExplorerTwoDimensionalSceneController {
  constructor() {
    this.$onInit = () => {
      this._setCanvasSize();
    };
  }

  //////////////////////////////////////////////////////////////////////
  /********************* Sizes Processing - Start *********************/
  _setCanvasSize() {
    let canvasArea = document.querySelector('explorer-two-dimensional-scene div.card-block');
    this.canvasWidth = canvasArea ? canvasArea.clientWidth : 760; // Unit: px
    this.canvasHeight = canvasArea ? canvasArea.clientHeight : 600; // Unit: px
  }
  /*********************** Sizes Processing - End **********************/
  //////////////////////////////////////////////////////////////////////  
}

export default {
  controller: ExplorerTwoDimensionalSceneController,
  template: require('./explorer-two-dimensional-scene.component.html')
};
