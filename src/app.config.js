appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('app', {
      abstract: true,
      views: {
        'main': {
          template: '<layout></layout>'
        }
      }
    });

  $stateProvider
    .state('app.home', {
      url: '/home',
      views: {
        'explorer-context@app': {
          template: '<!-- CONTEXT -->'
        },
        'explorer-content@app': {
          template: '<!-- CONTENT -->'
        }
      }
    });
}

export default appConfig;
