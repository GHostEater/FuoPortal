(function() {
  'use strict';

  angular
    .module('fuoPortal')
    .run(runBlock);

  /** @ngInject */
  function runBlock(User,$rootScope){
      $rootScope.user = User.profile;

  }

})();
