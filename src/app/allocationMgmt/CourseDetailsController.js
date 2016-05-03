/**
 * Created by GHostEater on 03-May-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("CourseDetailsController",function(Allocation,CourseReg,Student,Session,Semester,User,lodash,$stateParams){
            var vm = this;
            vm.students = [];
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
            Allocation.getMyCourses(User.profile.id)
                .then(function(data){
                    vm.course = lodash.find(data,{code: $stateParams.code});
                    CourseReg.getRegisterredStudents($stateParams.code,vm.semester.semester,vm.session.id)
                        .then(function(data){
                            for(var i=0; i<data.length; i++){
                                Student.getOne(data[i].matricNo)
                                    .then(function(data){
                                        vm.students.push(data);
                                    });
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