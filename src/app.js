import angular from 'angular';
import uiRouter from 'angular-ui-router';

import appConfig from './app.config';
import layoutModule from './layout/layout.module';

export default angular
  .module('app', [uiRouter, layoutModule])
  .config(appConfig)
  .name;
