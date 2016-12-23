class LayoutController {
  constructor() {
    this.$onInit = function () {
      this.menuOpened = true;
    };
  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }
}

export default {
  controller: LayoutController,
  template: require('./layout.component.html')
};
