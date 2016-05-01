/**
 * Created by Bello J on 4/21/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('StudentEditController',function(Student,Major,Department,College,Level,ModeOfEntry,toastr,matricNo,$modalInstance){
            var vm = this;
            Student.getOne(matricNo)
                .then(function(data){
                    vm.student = data;
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
                if(vm.form.$dirty && vm.form.$valid){
                    Student.edit(vm.student.matricNo,vm.student.firstName,vm.student.middleName,vm.student.lastName,vm.student.sex,vm.student.email,vm.student.phoneNumber,vm.student.dateBirth,
                        vm.student.nationality,vm.student.stateOrigin,vm.student.lga,vm.student.religion,vm.student.address,vm.student.nextOfKin,vm.student.nextOfKinAddress,vm.student.collegeId,
                        vm.student.departmentId,vm.student.majorId,vm.student.levelId,vm.student.modeOfEntryId,vm.student.session,vm.student.password)
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