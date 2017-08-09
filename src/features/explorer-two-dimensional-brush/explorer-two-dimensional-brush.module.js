import angular from 'angular';
import explorerTwoDimensionalBrushConfig from './explorer-two-dimensional-brush.config';
import contextPanelComponent from './explorer-two-dimensional-brush-context-panel.component';
import contentPanelComponent from './explorer-two-dimensional-brush-content-panel.component';
import brushPortalComponent from './explorer-two-dimensional-brush-portal.component';
import shapeListComponent from './explorer-two-dimensional-shape-list.component';
import sceneComponent from './explorer-two-dimensional-scene.component';
import './scss/explorer-two-dimensional-brush.scss';

export default angular
  .module('explorer.twoDimensionalBrush', [])
  .config(explorerTwoDimensionalBrushConfig)
  .component('explorerTwoDimensionalBrushContextPanel', contextPanelComponent)
  .component('explorerTwoDimensionalBrushContentPanel', contentPanelComponent)
  .component('explorerTwoDimensionalBrushPortal', brushPortalComponent)
  .component('explorerTwoDimensionalShapeList', shapeListComponent)
  .component('explorerTwoDimensionalScene', sceneComponent)
  .name;
