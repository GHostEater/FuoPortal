/**
 * Created by Bello J on 4/21/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('LecturerAddController',function(Lecturer,LecturerRank,LecturerStatus,College,Department,toastr,$modalInstance){
            var vm = this;
            LecturerRank.getAll()
                .then(function(data){
                    vm.ranks = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            LecturerStatus.getAll()
                .then(function(data){
                    vm.statuss = data;
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
                if(vm.form.$valid){
                    Lecturer.add(vm.firstName,vm.middleName,vm.lastName,vm.rankId,vm.statusId,vm.collegeId,
                        vm.departmentId,vm.phoneNumber,vm.email,vm.address,vm.password)
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