/**
 * Created by Bello J on 4/21/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('LecturerAddController',function(Lecturer,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                if(vm.form.$valid){
                    Lecturer.add(vm.lecturerId,vm.firstName,vm.middleName,vm.lastName,vm.rank,vm.status,vm.collegeId,vm.departmentId,vm.phoneNumber,vm.email,vm.address,vm.password)
                        .then(function(){
                            toastr.success("Lecturer Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add Lecturer");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();