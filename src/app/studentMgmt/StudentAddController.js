/**
 * Created by Bello J on 4/21/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('StudentAddController',function(Student,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                if(vm.form.$valid){
                    Course.add(vm.matricNo,vm.firstName,vm.middleName,vm.lastName,vm.collegeId,vm.departmentId,vm.majorId,vm.level,vm.mode_of_entry,vm.session,vm.dateBirth,vm.email,vm.address,vm.password)
                        .then(function(){
                            toastr.success("Student Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add Student");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();