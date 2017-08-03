class LayoutController {
  constructor() {
    this.$onInit = () => {
      this.menuOpened = true;
    };
  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }
}

export default {
  controller: LayoutController,
  template: require('./explorer-layout.component.html')
};
