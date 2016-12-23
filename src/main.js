import angular from 'angular';
import app from './app';
import './scss/app.scss';

angular.element(document).ready(function () {
  angular.bootstrap(document, [app]);
});
