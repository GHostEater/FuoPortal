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
        .state('lecturer',{url:'/lecturer',templateUrl:'app/lecturerMgmt/lecturer.html'})
        .state('co',{url:'/co',templateUrl:'app/coMgmt/co.html'})
        .state('hod',{url:'/hod',templateUrl:'app/hodMgmt/hod.html'})
        .state('department',{url:'/department',templateUrl:'app/departmentMgmt/department.html'})
        .state('academicAffairs',{url:'/academicAffair',templateUrl:'app/academicAffairMgmt/academicAffair.html'});

    $urlRouterProvider.otherwise('/');
  }

})();
