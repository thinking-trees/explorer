explorerTwoDimensionalBrushConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function explorerTwoDimensionalBrushConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/two-dimensional-brush/portal');

  $stateProvider
    .state('explorer.twoDimensionalBrush', {
      abstract: false,
      title: 'TWO_DIMENSIONAL_BRUSH',
      icon: 'home',
      url: '/two-dimensional-brush',
      views: {
        'explorer-context@explorer': {
          template: '<explorer-two-dimensional-brush-context-panel></explorer-two-dimensional-brush-context-panel>'
        },
        'explorer-content@explorer': {
          template: '<explorer-two-dimensional-brush-content-panel></explorer-two-dimensional-brush-content-panel>'
        }
      },      
      showAsMenu: true,
      order: 0
    });    

  $stateProvider
    .state('explorer.twoDimensionalBrush.portal', {
      url: '/portal',
      views: {
        'explorerTwoDimensionalBrushContent': {
          template: 'ExplorerTwoDimensionalBrushContent'
        }
      }
    });
}

export default explorerTwoDimensionalBrushConfig;
