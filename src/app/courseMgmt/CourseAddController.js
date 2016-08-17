/**
 * Created by GHostEater on 21-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('CourseAddController',function(Course,College,toastr,Level,Department,Major,$modalInstance){
            var vm = this;
            Level.getAll()
                .then(function(data){
                    vm.levels = data;
                });
            Department.getAll()
                .then(function(data){
                    vm.departments = data;
                });
            College.getAll()
                .then(function(data){
                    vm.colleges = data;
                });

            vm.ok = function(){
                if(vm.form.$valid){
                    Course.add(vm.code,vm.title,vm.unit,vm.semester,vm.levelId,vm.departmentId,vm.type,vm.collegeId)
                        .then(function(){
                            toastr.success("Course Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add Course");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();