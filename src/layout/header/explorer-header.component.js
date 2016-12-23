class HeaderController {
  constructor() {
    this.$onInit = function () {
      this.name = 'Header';
    };
  }
}

export default {
  controller: HeaderController,
  template: require('./explorer-header.component.html')
};
