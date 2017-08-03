import _ from 'lodash';

class PivotBarController {
  constructor($state) {
    this.$onInit = () => {
      this.name = 'PivotBar';
      this.$state = $state;
      this.getMenuItems();
      this.locateToDefaultMenu();
    };
  }

  getMenuItems() {
    let routerStates = this.$state.get();
    this.menuItems = _.filter(routerStates, {showAsMenu: true});
  }

  toggleMenu(menuItem) {
    _.forEach(this.menuItems, menuItem => {
      menuItem.opened = false;
    });
    menuItem.opened = true;
  }

  locateToDefaultMenu() {
    let defualtMenuItem = _.min(this.menuItems, menuItem => {
      return menuItem.order;
    });
    this.toggleMenu(defualtMenuItem);
  }
}

PivotBarController.$inject = ['$state'];

export default {
  controller: PivotBarController,
  template: require('./explorer-pivot-bar.component.html')
};
