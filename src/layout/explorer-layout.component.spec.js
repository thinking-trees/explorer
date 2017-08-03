import angular from 'angular';
import 'angular-mocks';
import layoutComponentOptions from './explorer-layout.component';

describe('Component: layout', () => {

  const MODULE_NAME = 'app.layout';
  const COMPONENT_NAME = 'layout';
  let $rootscope = void 0;
  let $componentController = void 0;
  let childScope = void 0;
  let layoutComponent = void 0;

  beforeEach(() => {
    angular
      .module(MODULE_NAME, [])
      .component(COMPONENT_NAME, layoutComponentOptions);
  });

  beforeEach(() => {
    angular.mock.module(MODULE_NAME);
    angular.mock.inject($injector => {
      $rootscope = $injector.get('$rootScope');
      childScope = $rootscope.$new();
      $componentController = $injector.get('$componentController');
    });
  });

  beforeEach(() => {
    layoutComponent = $componentController(COMPONENT_NAME, {
      $scope: childScope
    });

    layoutComponent.$onInit();
  });

  it('should open the menu by default', function () {
    expect(layoutComponent.menuOpened).toBeTruthy();
  });

  it('should hide the menu', function () {
    layoutComponent.toggleMenu();

    expect(layoutComponent.menuOpened).toBeFalsy();
  });

});
