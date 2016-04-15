(function() {
  'use strict';

  angular
    .module('fuoPortal')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login',{url:'/',templateUrl:'app/login.html'})
        .state('home',{url:'/home',templateUrl:'app/home.html'})
        .state('courseMgmt',{url:'/courseMgmt',templateUrl:'app/courseMgmt/courseMgmt.html'});

    $urlRouterProvider.otherwise('/');
  }

})();
