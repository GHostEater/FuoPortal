/**
 * Created by GHostEater on 21-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('CourseAddController',function(Course,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                if(vm.form.$valid){
                    Course.add(vm.code,vm.title,vm.unit,vm.semester,vm.level,vm.prerequisiteFor)
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