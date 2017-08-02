import angular from 'angular';
import './scss/app.scss';
import app from './app';

angular.element(document).ready(function () {
  angular.bootstrap(document, [app]);
});
