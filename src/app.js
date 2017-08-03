import angular from 'angular';
import appConfig from './app.config';
import explorerCoreModule from './explorer-core.module';
import explorerLayoutModule from './layout/explorer-layout.module';
import explorerTwoDimensionalBrushModule from 
  './features/explorer-two-dimensional-brush/explorer-two-dimensional-brush.module';

export default angular
  .module('app', [explorerCoreModule, explorerLayoutModule, explorerTwoDimensionalBrushModule])
  .config(appConfig)
  .name;
