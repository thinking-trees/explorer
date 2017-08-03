class ContextController {
  constructor() {
    this.$onInit = () => {
      this.name = 'Context';
    };
  }
}

export default {
  controller: ContextController,
  template: require('./explorer-context-panel.component.html')
};
