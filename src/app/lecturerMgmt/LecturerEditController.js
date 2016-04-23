/**
 * Created by Bello J on 4/21/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('LecturerEditController',function(Lecturer,Department,College,toastr,lecturerId,$modalInstance){
            var vm = this;
            Lecturer.getOne(lecturerId)
                .then(function(data){
                    vm.lecturer = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            College.getAll()
                .then(function(data){
                    vm.colleges = data;
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
            
            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    Lecturer.edit(vm.lecturerId,vm.firstName,vm.middleName,vm.lastName,vm.rank,vm.status,vm.collegeId,vm.departmentId,vm.phoneNumber,vm.email,vm.address,vm.password)
                        .then(function(){
                            toastr.success("Lecturer Changed");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Change Lecturer");
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