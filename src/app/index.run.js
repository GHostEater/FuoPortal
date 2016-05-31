(function() {
  'use strict';

  angular
    .module('fuoPortal')
    .run(runBlock);

  /** @ngInject */
  function runBlock(User,$location){
      if (!User.profile.loggedIn){
          $location.url('/');
      }

  }

})();
