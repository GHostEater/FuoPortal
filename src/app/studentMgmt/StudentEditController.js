/**
 * Created by Bello J on 4/21/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('StudentEditController',function(User,Student,Major,Department,College,Level,ModeOfEntry,toastr,matricNo,$modalInstance,lodash){
            var vm = this;
            vm.user = User.profile;
            Student.getOne(matricNo)
                .then(function(data){
                    vm.student = data;
                    Major.getAll()
                        .then(function(data){
                            vm.mjs = data;
                            vm.majors = lodash.filter(vm.mjs,{departmentId:vm.student.departmentId});
                        });
                    Department.getAll()
                        .then(function(data){
                            vm.depts = data;
                            vm.departments = lodash.filter(vm.depts,{collegeId:vm.student.collegeId});
                        });
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
                vm.majors = lodash.filter(vm.mjs,{departmentId:vm.student.departmentId});
            };
            vm.changeCollege = function(){
                vm.departments = lodash.filter(vm.depts,{collegeId:vm.student.collegeId});
            };

            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    Student.edit(vm.student.id,vm.student.matricNo,vm.student.firstName,vm.student.middleName,vm.student.lastName,
                        vm.student.sex,vm.student.email,vm.student.phoneNumber,vm.student.dateBirth,vm.student.nationality,
                        vm.student.stateOrigin,vm.student.lga,vm.student.religion,vm.student.address,vm.student.nextOfKin,
                        vm.student.nextOfKinAddress,vm.student.collegeId,vm.student.departmentId,vm.student.majorId,
                        vm.student.levelId,vm.student.modeOfEntryId,vm.student.session,vm.student.password,vm.student.status,
                        vm.student.town,vm.student.genotype,vm.student.bloodGroup,vm.student.oLevel,vm.student.parentNo)
                        .then(function(){
                            toastr.success("Student Changed");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Change Student");
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