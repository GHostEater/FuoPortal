/**
 * Created by Bello J on 4/21/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('StudentAddController',function(Student,toastr,Major,College,Department,ModeOfEntry,Level,$modalInstance,lodash){
            var vm = this;
            vm.collegeId = "";
            vm.departmentId = '';
            vm.majorId = '';
            vm.levelId = '';
            vm.modeOfEntryId = '';
            Major.getAll()
                .then(function(data){
                    vm.mjs = data;
                });
            Department.getAll()
                .then(function(data){
                    vm.depts = data;
                });
            College.getAll()
                .then(function(data){
                    vm.colleges = data;
                });
            Level.getAll()
                .then(function(data){
                    vm.levels = data;
                });
            ModeOfEntry.getAll()
                .then(function(data){
                    vm.modeOfEntries = data;
                });
            vm.changeDepartment = function(){
                vm.majors = lodash.filter(vm.mjs,{departmentId:vm.departmentId});
            };
            vm.changeCollege = function(){
                vm.departments = lodash.filter(vm.depts,{collegeId:vm.collegeId});
            };

            vm.ok = function(){
                if(vm.form.$valid){
                    Student.add(vm.matricNo,vm.firstName,vm.middleName,vm.lastName,vm.sex,vm.email,vm.phoneNumber,vm.dateBirth,
                        vm.nationality,vm.stateOrigin,vm.lga,vm.religion,vm.address,vm.nextOfKin,vm.nextOfKinAddress,vm.collegeId,
                        vm.departmentId,vm.majorId,vm.levelId,vm.modeOfEntryId,vm.session,vm.password,0,vm.town,
                        vm.genotype,vm.bloodGroup,vm.oLevel,vm.parentNo)
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