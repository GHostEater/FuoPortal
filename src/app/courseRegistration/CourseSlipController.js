/**
 * Created by GHostEater on 01-May-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("CourseSlipController",function(CourseReg,Host,College,Student,Semester,toastr,lodash,Session,User){
            var vm = this;
            vm.counter = 0;
            vm.host = Host.host;
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
            Student.getOne(User.profile.id)
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