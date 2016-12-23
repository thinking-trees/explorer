class PivotBarController {
  constructor() {
    this.$onInit = function () {
      this.name = 'PivotBar';
    };
  }
}

export default {
  controller: PivotBarController,
  template: require('./explorer-pivot-bar.component.html')
};
