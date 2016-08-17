(function() {
  'use strict';

  angular.module('fuoPortal')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $stateProvider
        .state('login',{url:'/',templateUrl:'app/login.html'})
        .state('adminLogin',{url:'/admin',templateUrl:'app/adminLogin.html'})
        .state('home',{url:'/home',templateUrl:'app/home.html'})

        .state('co',{url:'/sysMgmt/co',templateUrl:'app/coMgmt/co.html'})
        .state('hod',{url:'/sysMgmt/hod',templateUrl:'app/hodMgmt/hod.html'})
        .state('examOfficer',{url:'/sysMgmt/examOfficer',templateUrl:'app/examOfficerMgmt/examOfficer.html'})
        .state('levelAdviser',{url:'/sysMgmt/levelAdviser',templateUrl:'app/levelAdviserMgmt/levelAdviser.html'})
        .state('student',{url:'/sysMgmt/student',templateUrl:'app/studentMgmt/student.html'})
        .state('lecturer',{url:'/sysMgmt/lecturer',templateUrl:'app/lecturerMgmt/lecturer.html'})
        .state('lecturerRank',{url:'/sysMgmt/lecturerRank',templateUrl:'app/lecturerRankMgmt/lecturerRank.html'})
        .state('lecturerStatus',{url:'/sysMgmt/lecturerStatus',templateUrl:'app/lecturerStatusMgmt/lecturerStatus.html'})
        .state('academicAffair',{url:'/sysMgmt/academicAffair',templateUrl:'app/academicAffairMgmt/academicAffair.html'})
        .state('studentAffair',{url:'/sysMgmt/studentAffair',templateUrl:'app/studentAffairMgmt/studentAffair.html'})
        .state('college',{url:'/sysMgmt/college',templateUrl:'app/collegeMgmt/college.html'})
        .state('department',{url:'/sysMgmt/department',templateUrl:'app/departmentMgmt/department.html'})
        .state('major',{url:'/sysMgmt/major',templateUrl:'app/majorMgmt/major.html'})
        .state('course',{url:'/sysMgmt/course',templateUrl:'app/courseMgmt/course.html'})
        .state('courseToMajor',{url:'/sysMgmt/courseToMajor',templateUrl:'app/courseMgmt/courseToMajor.html'})
        .state('modeOfEntry',{url:'/sysMgmt/modeOfEntry',templateUrl:'app/modeOfEntryMgmt/modeOfEntry.html'})
        .state('session',{url:'/sysMgmt/session',templateUrl:'app/sessionMgmt/session.html'})
        .state('semester',{url:'/sysMgmt/semester',templateUrl:'app/semesterMgmt/changeSemester.html'})
        .state('level',{url:'/sysMgmt/level',templateUrl:'app/levelMgmt/level.html'})

        .state('myCourses',{url:'/MyCourses',templateUrl:'app/allocationMgmt/myCourses.html'})
        .state('courseAllocation',{url:'/CourseAllocation',templateUrl:'app/allocationMgmt/hodAllocation.html'})
        .state('courseDetails',{url:'/courseDetails/:code',templateUrl:'app/allocationMgmt/courseDetails.html'})
        .state('resultComputation',{url:'/resultComputation',templateUrl:'app/result/resultComputation.html'})

        .state('courseRegistration',{url:'/student/courseRegistration',templateUrl:'app/courseRegistration/courseRegister.html'})
        .state('courseSlip',{url:'/student/courseSlip',templateUrl:'app/courseRegistration/courseSlip.html'})
        .state('levelAdviserCourseSlip',{url:'/student/levelAdviserCourseSlip/:id',templateUrl:'app/levelAdviserMgmt/levelAdviserCourseSlip.html'})
        .state('studentLevelAdviser',{url:'/student/studentLevelAdviser/:id',templateUrl:'app/levelAdviserMgmt/studentLevelAdviser.html'})
        .state('broadSheet',{url:'/lecturer/broadSheet',templateUrl:'app/result/broadSheet.html'})
        .state('resultBroadSheet',{url:'/lecturer/resultBroadSheet',templateUrl:'app/result/resultBroadSheet.html'})
        .state('myTranscript',{url:'/lecturer/myTranscript/:id',templateUrl:'app/result/myTranscript.html'})
        .state('myResult',{url:'/student/Result',templateUrl:'app/result/myResult.html'})

        .state('hostel',{url:'/sysMgmt/hostel',templateUrl:'app/hostelMgmt/hostel.html'})
        .state('room',{url:'/sysMgmt/room',templateUrl:'app/roomMgmt/room.html'})
        .state('roomAllocation',{url:'/roomAllocation',templateUrl:'app/roomAllocation/roomAllocation.html'})

        .state('studentList',{url:'/examOfficer/StudentList',templateUrl:'app/examOfficerMgmt/studentList.html'})
        .state('studentResultView',{url:'/examOfficer/StudentResultView/:id',templateUrl:'app/examOfficerMgmt/studentResultView.html'})

        .state('adminCourseAllocation',{url:'/AdminCourseAllocation',templateUrl:'app/allocationMgmt/adminAllocation.html'})
        .state('adminBroadSheet',{url:'/adminBroadSheet',templateUrl:'app/result/adminBroadSheet.html'})
        .state('adminResultBroadSheet',{url:'/adminResultBroadSheet',templateUrl:'app/result/adminResultBroadSheet.html'})
        .state('adminStudentList',{url:'/academicAffair/StudentList',templateUrl:'app/academicAffairMgmt/adminStudentList.html'})
        .state('editLogs',{url:'/academicAffair/ResultEditLogs',templateUrl:'app/academicAffairMgmt/resultEditLogs.html'});

    $urlRouterProvider.otherwise('/');
  }

})();
