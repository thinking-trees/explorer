class HeaderController {
  constructor() {
    this.$onInit = () => {
      this.name = 'Header';
    };
  }
}

export default {
  controller: HeaderController,
  template: require('./explorer-header.component.html')
};
