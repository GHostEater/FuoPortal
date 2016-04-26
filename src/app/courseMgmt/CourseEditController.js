/**
 * Created by GHostEater on 21-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('CourseEditController',function(Course,Level,Major,Department,toastr,code,$modalInstance){
            var vm = this;
            Course.getOne(code)
                .then(function(data){
                    vm.course = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Level.getAll()
                .then(function(data){
                    vm.levels = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Department.getAll()
                .then(function(data){
                    vm.departments = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Major.getAll()
                .then(function(data){
                    vm.majors = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    Course.edit(vm.course.code,vm.course.title,vm.course.unit,vm.course.semesterId,vm.course.levelId,
                        vm.course.departmentId,vm.course.majorId,vm.course.prerequisiteFor)
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