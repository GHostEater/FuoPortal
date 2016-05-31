/**
 * Created by Bello J on 5/17/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("LevelAdviserCourseSlipController",function(CourseReg,College,Student,$stateParams,Semester,toastr,lodash,Session,User){
            var vm = this;
            vm.counter = 0;
            Session.getAll()
                .then(function(data){
                    vm.session = lodash.findLast(data);
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Semester.get()
                .then(function(data){
                    vm.semester = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Student.getOneById($stateParams.id)
                .then(function(data){
                    vm.student = data;
                    College.getOne(vm.student.collegeId)
                        .then(function(data){
                            vm.college = data;
                        })
                        .catch(function(){
                            toastr.warning("Could Not Connect");
                        });
                    CourseReg.getRegisterredCourses(vm.student.matricNo,vm.semester.semester,vm.session.id)
                        .then(function(data){
                            vm.courses = data;
                            for(var i = 0; i < vm.courses.length; i++){
                                vm.counter += Number(vm.courses[i].unit);
                            }
                        })
                        .catch(function(){
                            toastr.warning("Could Not Connect");
                        });
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
        });
})();