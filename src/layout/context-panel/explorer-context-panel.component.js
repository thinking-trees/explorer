class ContextController {
  constructor() {
    this.$onInit = function () {
      this.name = 'Context';
    };
  }
}

export default {
  controller: ContextController,
  template: require('./explorer-context-panel.component.html')
};
