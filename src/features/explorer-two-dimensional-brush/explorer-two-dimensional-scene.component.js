import angular from 'angular';
import _ from 'lodash';
import SceneStates from './core/scene-states.enum';
import ShapesInteractiveUtility from './utilities/shapes-interactive-utility.class';
import GuidelinesUtility from './utilities/guidelines-utility.class';
import UnitUtility from './utilities/unit-utility.class';
import ScenesManager from './core/scenes-manager.class';
import sceneMouseDownHandler from './event-handlers/scene-mouse-down.handler';
import sceneMouseMoveHandler from './event-handlers/scene-mouse-move.handler';
import sceneMouseUpHandler from './event-handlers/scene-mouse-up.handler';
import sceneDoubleClickHandler from './event-handlers/scene-double-click.handler';
import sceneKeyUpHandler from './event-handlers/scene-key-up.handler';
import sceneKeyDownHandler from './event-handlers/scene-key-down.handler';
import SceneFactory from './core/scene-factory.service';

class ExplorerTwoDimensionalSceneController {
  constructor($rootScope, $scope, $http, $q, $stateParams,
    $timeout, $window) {
    this._redrawSceneTimer = void 0; // record timer for redraw scene from $timeout     
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$http = $http;
    this.$q = $q;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.$window = $window;

    this.$onInit = () => {
      this.rendering = true;
      angular.element(document).ready(() => {
        this.init();
      });
    };

    this.$onDestroy = () => {
      this.$timeout.cancel(this._redrawSceneTimer);
      this.$rootScope.$on('$stateChangeStart', () => {});
    };
  }

  init() {
    this._getCanvasContext();
    this._setCanvasSize();
    this._createScene();
    this._loadShapes().then(() => {
      this._render();      
    });

    // Register Events in Scene
    this._registerListenersForMouseEventsInSceneCanvas();
    this._registerListenerForShapeModelDragOverEvent();
    this._registerListenerForShapeModelDroppedEvent();
    this._registerListenerForWindowResizeEvent();
    this._registerListenerForContextPanelToggle();
    this._registerListenerForStateChangeStart();
  }

  onSave() {
    this.isSaving = true;
    return this.scene.onSave()
      .then(() => {
        // ngToast.create({
        //   className: 'success',
        //   content: `<strong>SAVED SUCCESSFULLY.</strong>`,
        //   timeout: 2000,
        //   dismissOnTimeout: true
        // });
        this.scene.stateManager.transitionToSaved();
        this.isSaving = false;
      })
      .catch(() => {
        // ngToast.create({
        //   className: 'danger',
        //   content: `<strong>${error.data.message}</strong>`,
        //   timeout: 2000,
        //   dismissOnTimeout: true
        // });
        this.isSaving = false;
      });
  }

  //////////////////////////////////////////////////////////////////////
  /********************* Sizes Processing - Start *********************/
  _setCanvasSize() {
    let canvasArea = document.querySelector('explorer-two-dimensional-scene div.scene-container');
    this.canvasWidth = canvasArea ? canvasArea.clientWidth : 760; // Unit: px
    this.canvasHeight = canvasArea ? canvasArea.clientHeight : 600; // Unit: px
  }
  /*********************** Sizes Processing - End **********************/
  //////////////////////////////////////////////////////////////////////  

  //////////////////////////////////////////////////////////////////////
  /*********************** Space Renderer - Start *********************/
  _getCanvasContext() {
    let canvasElementForScene = document.getElementById('scene');
    this._canvasContextForScene = canvasElementForScene.getContext('2d');
  }

  _createScene() {
    let sceneConfigRepository = SceneFactory.createSceneConfigRepository(this.$stateParams.sceneType, {
      sceneId: this.$stateParams.sceneId,
      ngLibrary: {$http: this.$http, $q: this.$q, $scope: this.$scope, $timeout: this.$timeout}
    });
    let sceneOptions = {
      canvasContext: this._canvasContextForScene,
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
      sceneConfigRepository: sceneConfigRepository
    };
    this.scene = SceneFactory.createScene(this.$stateParams.sceneType, sceneOptions);
    ScenesManager.setCurrentScene(this.scene);
  }

  _loadShapes() {
    this.shapesLoading = true;
    return this.scene.loadShapes()
      .then(() => {
        this.shapesLoading = false;
      });
  }

  _render() {
    this.scene.render();
    this.rendering = false;
  }

  _redrawScene() {
    this._redrawSceneTimer && this.$timeout.cancel(this._redrawSceneTimer);
    let timeToRedraw = 300;
    if (this.rendering) {
      // wait for the rendering scene is completed as redraw action needs the shapes loaded
      this._redrawSceneTimer = this.$timeout(() => {this._redrawScene();}, timeToRedraw);
    } else {
      this._redrawSceneTimer = this.$timeout(() => { 
        this.rendering = true;      
        let shapesNotSaved = this._filterShapesNotSaved(this.scene.shapesManager.allShapes);
        let previousXPixelsPerMillimetre = this.scene.xPixelsPerMillimetre;
        let previousYPixelsPerMillimetre = this.scene.yPixelsPerMillimetre;
        this._getCanvasContext();
        this._setCanvasSize();
        this._createScene();
        this._loadShapes().then(() => {
          this._addShapesNotSavedAfterSceneReloaded(shapesNotSaved, 
            previousXPixelsPerMillimetre, previousYPixelsPerMillimetre);
          this._render();
        });
      }, timeToRedraw);   
    }
  }
  /***********************  Space Renderer - End ***********************/
  //////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////
  /************** Register Listeners for Events - Start **************/
  _registerListenersForMouseEventsInSceneCanvas() {
    let canvasElementForScene = document.getElementById('scene');
    canvasElementForScene.addEventListener('mouseenter', () => {
      canvasElementForScene.focus();
    });
    canvasElementForScene.addEventListener('mouseleave', event => {
      canvasElementForScene.blur();
      // actions that will do when mouse up event is triggered
      sceneMouseUpHandler(event, this.scene);
    });
    canvasElementForScene.addEventListener('mousedown', event => {
      sceneMouseDownHandler(event, this);
      this.$scope.$digest();
    });
    canvasElementForScene.addEventListener('mousemove', event => {
      sceneMouseMoveHandler(event, this);
      this.$scope.$digest();
    });
    canvasElementForScene.addEventListener('mouseup', event => {
      sceneMouseUpHandler(event, this.scene);
    });
    canvasElementForScene.addEventListener('dblclick', event => {
      sceneDoubleClickHandler(event, this);
      this.$scope.$digest();
    });
    canvasElementForScene.addEventListener('keydown', event => {
      sceneKeyDownHandler(event, this);
      this.$scope.$digest();
    });
    canvasElementForScene.addEventListener('keyup', event => {
      sceneKeyUpHandler(event, this);
      this.$scope.$digest();
    });
  }

  _registerListenerForShapeModelDragOverEvent() {
    this.$scope.$on('explorerShapeModelDragOver', (event, data) => {
      if (this.shapesLoading || this.rendering || this.isSaving) {
        return;
      }
      let shapeWidth = UnitUtility.convertMillimetresToPixels(data.width, this.scene.xPixelsPerMillimetre);
      let shapeHeight = UnitUtility.convertMillimetresToPixels(data.height, this.scene.yPixelsPerMillimetre);
      let shapeForDragOverModel = {
        category: data.category,
        type: data.type,
        name: data.name,
        x: data.x,
        y: data.y,
        width: shapeWidth || this.scene.defaultShapeWidth,
        height: shapeHeight || this.scene.defaultShapeHeight,
        editable: data.editable,
        placementCategory: parseInt(data.placementCategory)
      };
      this.scene.onShapeModelDragOver(event, shapeForDragOverModel);
      this._render();
    });
  }

  _registerListenerForShapeModelDroppedEvent() {
    this.$scope.$on('explorerShapeModelDropped', (event, data) => {
      if (this.shapesLoading || this.rendering || this.isSaving) {
        return;
      }
      let shapeWidth = UnitUtility.convertMillimetresToPixels(data.width, this.scene.xPixelsPerMillimetre);
      let shapeHeight = UnitUtility.convertMillimetresToPixels(data.height, this.scene.yPixelsPerMillimetre);
      let targetArea = {
        x: data.x,
        y: data.y,
        width: shapeWidth || this.scene.defaultShapeWidth,
        height: shapeHeight || this.scene.defaultShapeHeight
      };
      let stackIndex = ShapesInteractiveUtility.calculateMaxStackIndexOnTargetArea(targetArea,
          this.scene.shapesManager.allShapes) + 1;
      let shapeForDroppedModel = {
        id: `element-${++this.scene.shapeIdCounter}`,
        category: data.category,
        type: data.type,
        name: data.name,
        canvasContext: this._canvasContextForScene,
        x: data.x,
        y: data.y,
        z: 0,
        rotation: 0,
        stackIndex: stackIndex,
        width: shapeWidth || this.scene.defaultShapeWidth,
        height: shapeHeight || this.scene.defaultShapeHeight,
        canvasWidth: this.canvasWidth,
        canvasHeight: this.canvasHeight,
        placementCategory: parseInt(data.placementCategory),
        editable: data.editable
      };
      this.scene.shapesManager.addShape(shapeForDroppedModel);
      this.scene.stateManager.transitionToChanged();
      ShapesInteractiveUtility.snapToShape(shapeForDroppedModel, this.scene.shapesManager.allShapes);
      GuidelinesUtility.resetGuidelinesXAndGuidelinesY(this.scene);
      this.scene.onShapeModelDropped(event, shapeForDroppedModel);
      this._render();
    });
  }

  _registerListenerForWindowResizeEvent() {
    this.$window.addEventListener('resize', () => {
      this._redrawScene();
    });
  }

  _registerListenerForContextPanelToggle() {
    let isContextPanelPristine = true;
    this.$scope.$watch(() => this.layoutCtrl.menuOpened, () => {
      if (isContextPanelPristine) {
        isContextPanelPristine = false;
        return;
      }
      this._redrawScene();
    });
  }

  _registerListenerForStateChangeStart() {
    let processing = false;
    this.$rootScope.$on('$stateChangeStart', (event) => {
      if (processing === true || this.isSaving) {
        return false;
      }
      if (SceneStates.changed === this.scene.stateManager.getCurrentState()) {
        event.preventDefault();
        processing = true;
        // Tips for scene not saving yet and do something else
      }
    });
  }
  /**************** Register Listeners for Events - End ****************/
  //////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////
  /************************ Utilities - Start ************************/
  _filterShapesNotSaved(shapes) {
    let shapesNotSaved = _.filter(shapes, shape => {
      return shape.editable && (!shape.programmaticName || 'undefined' === shape.programmaticName);
    });
    return shapesNotSaved;
  }

  _addShapesNotSavedAfterSceneReloaded(shapesNotSaved, previousXPixelsPerMillimetre, previousYPixelsPerMillimetre) {
    for (let shape of shapesNotSaved) {
      // Canvas size may change after scene reloaded
      // So, it's necessary to update shape size
      let millimetresForX = UnitUtility.convertPixelsToMillimetres(shape.x, previousXPixelsPerMillimetre);
      let millimetresForY = UnitUtility.convertPixelsToMillimetres(shape.y, previousYPixelsPerMillimetre);
      let millimetresForWidth = UnitUtility.convertPixelsToMillimetres(shape.width, previousXPixelsPerMillimetre);
      let millimetresForHeight = UnitUtility.convertPixelsToMillimetres(shape.height, previousYPixelsPerMillimetre);      
      shape.x = UnitUtility.convertMillimetresToPixels(millimetresForX, this.scene.xPixelsPerMillimetre);
      shape.y = UnitUtility.convertMillimetresToPixels(millimetresForY, this.scene.yPixelsPerMillimetre);
      shape.width = UnitUtility.convertMillimetresToPixels(millimetresForWidth, this.scene.xPixelsPerMillimetre);
      shape.height = UnitUtility.convertMillimetresToPixels(millimetresForHeight, this.scene.yPixelsPerMillimetre);      
      shape.id = ++this.scene.shapeIdCounter;
    }
    this.scene.shapesManager.addShapes(shapesNotSaved);
  }
  /************************** Utilities - End **************************/
  //////////////////////////////////////////////////////////////////////
  
}

ExplorerTwoDimensionalSceneController.$inject = ['$rootScope', '$scope', '$http', '$q', '$stateParams',
  '$timeout', '$window'];

export default {
  controller: ExplorerTwoDimensionalSceneController,
  template: require('./explorer-two-dimensional-scene.component.html'),
  require: {
    layoutCtrl: '^explorerLayout'
  }
};
