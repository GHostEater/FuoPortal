(function() {
  'use strict';

  angular
    .module('fuoPortal')
    .run(runBlock);

  /** @ngInject */
  function runBlock(User,$rootScope,$location){
      $rootScope.user = User.profile;

      if(!$rootScope.user.loggedIn){
          $location.url('/login');
      }
  }

})();
