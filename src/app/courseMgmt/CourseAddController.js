/**
 * Created by GHostEater on 21-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('CourseAddController',function(Course,toastr,Level,Department,Major,$modalInstance){
            var vm = this;
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
                if(vm.form.$valid){
                    Course.add(vm.code,vm.title,vm.unit,vm.semester,vm.levelId,vm.departmentId,vm.type)
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