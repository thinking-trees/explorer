import angular from 'angular';
import 'angular-mocks';
import sceneComponentOptions from './explorer-two-dimensional-scene.component';

describe('Component: explorerTwoDimensionalScene', () => {

  const MODULE_NAME = 'explorer.twoDimensionalBrush';
  const COMPONENT_NAME = 'explorerTwoDimensionalScene';
  let $rootscope = void 0;
  let $componentController = void 0;
  let childScope = void 0;
  let sceneComponent = void 0;

  beforeEach(() => {
    angular
      .module(MODULE_NAME, [])
      .component(COMPONENT_NAME, sceneComponentOptions);
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
    sceneComponent = $componentController(COMPONENT_NAME, {
      $scope: childScope
    });
  });

  it('should set default size for scene on canvas', () => {
    sceneComponent.$onInit();

    expect(sceneComponent.canvasWidth).toEqual(760);
    expect(sceneComponent.canvasHeight).toEqual(600);
  });

});
