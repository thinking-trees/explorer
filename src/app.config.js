appConfig.$inject = ['$stateProvider', '$locationProvider'];

function appConfig($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('explorer', {
      abstract: true,
      views: {
        'main': {
          template: '<explorer-layout></explorer-layout>'
        }
      }
    });

}

export default appConfig;
