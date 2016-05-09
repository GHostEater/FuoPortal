(function() {
  'use strict';

  angular.module('fuoPortal')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login',{url:'/',templateUrl:'app/login.html'})
        .state('home',{url:'/home',templateUrl:'app/home.html'})

        .state('co',{url:'/sysMgmt/co',templateUrl:'app/coMgmt/co.html'})
        .state('hod',{url:'/sysMgmt/hod',templateUrl:'app/hodMgmt/hod.html'})
        .state('student',{url:'/sysMgmt/student',templateUrl:'app/studentMgmt/student.html'})
        .state('lecturer',{url:'/sysMgmt/lecturer',templateUrl:'app/lecturerMgmt/lecturer.html'})
        .state('lecturerRank',{url:'/sysMgmt/lecturerRank',templateUrl:'app/lecturerRankMgmt/lecturerRank.html'})
        .state('lecturerStatus',{url:'/sysMgmt/lecturerStatus',templateUrl:'app/lecturerStatusMgmt/lecturerStatus.html'})
        .state('academicAffairs',{url:'/sysMgmt/academicAffairs',templateUrl:'app/academicAffairMgmt/academicAffair.html'})
        .state('college',{url:'/sysMgmt/college',templateUrl:'app/collegeMgmt/college.html'})
        .state('department',{url:'/sysMgmt/department',templateUrl:'app/departmentMgmt/department.html'})
        .state('major',{url:'/sysMgmt/major',templateUrl:'app/majorMgmt/major.html'})
        .state('course',{url:'/sysMgmt/course',templateUrl:'app/courseMgmt/course.html'})
        .state('courseToMajor',{url:'/sysMgmt/courseToMajor',templateUrl:'app/courseMgmt/courseToMajor.html'})
        .state('modeOfEntry',{url:'/sysMgmt/modeOfEntry',templateUrl:'app/modeOfEntryMgmt/modeOfEntry.html'})
        .state('session',{url:'/sysMgmt/session',templateUrl:'app/sessionMgmt/session.html'})
        .state('level',{url:'/sysMgmt/level',templateUrl:'app/levelMgmt/level.html'})

        .state('myCourses',{url:'/MyCourses',templateUrl:'app/allocationMgmt/myCourses.html'})
        .state('courseAllocation',{url:'/CourseAllocation',templateUrl:'app/allocationMgmt/hodAllocation.html'})
        .state('courseDetails',{url:'/courseDetails/:code',templateUrl:'app/allocationMgmt/courseDetails.html'})

        .state('courseRegistration',{url:'/student/courseRegistration',templateUrl:'app/courseRegistration/courseRegister.html'})
        .state('courseSlip',{url:'/student/courseSlip',templateUrl:'app/courseRegistration/courseSlip.html'})
        .state('myResult',{url:'/student/Result',templateUrl:'app/result/myResult.html'});

    $urlRouterProvider.otherwise('/');
  }

})();
