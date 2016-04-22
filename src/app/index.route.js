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
        .state('course',{url:'/course',templateUrl:'app/courseMgmt/course.html'})
        .state('student',{url:'/student',templateUrl:'app/studentMgmt/student.html'})
        .state('lecturer',{url:'/lecturer',templateUrl:'app/lecturerMgmt/lecturer.html'});

    $urlRouterProvider.otherwise('/');
  }

})();
