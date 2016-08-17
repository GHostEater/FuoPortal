/**
 * Created by GHostEater on 21-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('CourseEditController',function(College,Course,Level,Department,toastr,code,$modalInstance){
            var vm = this;
            Course.getOne(code)
                .then(function(data){
                    vm.course = data;
                });
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
                if(vm.form.$dirty && vm.form.$valid){
                    Course.edit(vm.course.code,vm.course.title,vm.course.unit,vm.course.semester,vm.course.levelId,
                        vm.course.departmentId,vm.course.type,vm.course.collegeId)
                        .then(function(){
                            toastr.success("Course Changed");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Change Course");
                        });
                }
                else if(vm.form.$pristine && vm.form.$valid){
                    toastr.info("No Changes");
                    $modalInstance.close();
                }
                else if(vm.form.$invalid){
                    toastr.error("Errors in form");
                }
            };
        });
})();