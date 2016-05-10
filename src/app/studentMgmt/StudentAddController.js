/**
 * Created by Bello J on 4/21/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('StudentAddController',function(Student,toastr,Major,College,Department,ModeOfEntry,Level,$modalInstance){
            var vm = this;
            vm.collegeId = "";
            vm.departmentId = '';
            vm.majorId = '';
            vm.levelId = '';
            vm.modeOfEntry = '';
            Major.getAll()
                .then(function(data){
                    vm.majors = data;
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
            College.getAll()
                .then(function(data){
                    vm.colleges = data;
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
            ModeOfEntry.getAll()
                .then(function(data){
                    vm.modeOfEntries = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            vm.ok = function(){
                if(vm.form.$valid){
                    Student.add(vm.matricNo,vm.firstName,vm.middleName,vm.lastName,vm.sex,vm.email,vm.phoneNumber,vm.dateBirth,
                        vm.nationality,vm.stateOrigin,vm.lga,vm.religion,vm.address,vm.nextOfKin,vm.nextOfKinAddress,vm.collegeId,
                        vm.departmentId,vm.majorId,vm.levelId,vm.modeOfEntryId,vm.session,vm.password)
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