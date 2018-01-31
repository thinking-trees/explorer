import angular from 'angular';
import 'angular-mocks';
import shapeListComponentOptions from './explorer-two-dimensional-shape-list.component';

describe('Component: explorerTwoDimensionalShapeList', () => {

  const MODULE_NAME = 'explorer.twoDimensionalBrush';
  const COMPONENT_NAME = 'explorerTwoDimensionalShapeList';
  let $rootscope = void 0;
  let $componentController = void 0;
  let childScope = void 0;
  let shapeListComponent = void 0;

  beforeEach(() => {
    angular
      .module(MODULE_NAME, [])
      .component(COMPONENT_NAME, shapeListComponentOptions);
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
    shapeListComponent = $componentController(COMPONENT_NAME, {
      $scope: childScope
    });
  });

  it('should select FLOOR category for shapes', () => {
    let floorCategory = 'FLOOR';
    shapeListComponent.selectCategory(floorCategory);

    expect(shapeListComponent.currentActivedCategory).toEqual(floorCategory);
  });

  it('should load shape list', () => {
    shapeListComponent.loadShapeList();

    expect(shapeListComponent.shapeList).toBeDefined();
  });

});
