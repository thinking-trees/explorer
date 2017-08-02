import angular from 'angular';
import explorerTwoDimensionalBrushConfig from './explorer-two-dimensional-brush.config';
import contextPanelComponent from './explorer-two-dimensional-brush-context-panel.component';
import contentPanelComponent from './explorer-two-dimensional-brush-content-panel.component';
import './scss/explorer-two-dimensional-brush.scss';

export default angular
  .module('explorer.twoDimensionalBrush', [])
  .config(explorerTwoDimensionalBrushConfig)
  .component('explorerTwoDimensionalBrushContextPanel', contextPanelComponent)
  .component('explorerTwoDimensionalBrushContentPanel', contentPanelComponent)
  .name;
