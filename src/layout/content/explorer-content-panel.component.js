class ContentController {
  constructor() {
    this.$onInit = function () {
      this.name = 'Content';
    };
  }
}

export default {
  controller: ContentController,
  template: require('./explorer-content-panel.component.html')
};
