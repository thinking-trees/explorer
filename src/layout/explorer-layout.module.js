import angular from 'angular';
import layoutComponent from './explorer-layout.component';
import headerComponent from './header/explorer-header.component';
import pivotBarComponent from './pivot-bar/explorer-pivot-bar.component';
import contextPanelComponent from './context-panel/explorer-context-panel.component';
import contentComponent from './content/explorer-content-panel.component';

export default angular
  .module('explorer.layout', [])
  .component('explorerLayout', layoutComponent)
  .component('explorerHeader', headerComponent)
  .component('explorerPivotBar', pivotBarComponent)
  .component('explorerContextPanel', contextPanelComponent)
  .component('explorerContentPanel', contentComponent)
  .name;
