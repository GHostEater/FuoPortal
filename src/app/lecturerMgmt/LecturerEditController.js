/**
 * Created by Bello J on 4/21/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('LecturerEditController',function(Lecturer,LecturerRank,LecturerStatus,Department,College,toastr,id,$modalInstance){
            var vm = this;
            Lecturer.getOne(id)
                .then(function(data){
                    vm.lecturer = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
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
                if(vm.form.$dirty && vm.form.$valid){
                    Lecturer.edit(id,vm.lecturer.firstName,vm.lecturer.middleName,vm.lecturer.lastName,vm.lecturer.rankId,
                        vm.lecturer.statusId,vm.lecturer.collegeId,vm.lecturer.departmentId,vm.lecturer.phoneNumber,
                        vm.lecturer.email,vm.lecturer.address,vm.lecturer.password)
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