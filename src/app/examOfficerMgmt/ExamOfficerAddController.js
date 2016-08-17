/**
 * Created by Bello J on 5/12/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('ExamOfficerAddController',function(ExamOfficer,Lecturer,User,Department,toastr,$modalInstance){
            var vm = this;
            Lecturer.getAll()
                .then(function(data){
                    vm.lecturers = data;
                });
            Lecturer.getOne(User.profile.id)
                .then(function(data){
                    vm.hod = data;
                });
            Department.getAll()
                .then(function(data){
                    vm.departments = data;
                });

            vm.ok = function(){
                if(vm.form.$valid){
                    ExamOfficer.add(vm.lecturerId,vm.hod.departmentId)
                        .then(function(){
                            toastr.success("Exam Officer Added");
                            $modalInstance.close();
                        })
                        .catch(function(error){
                            if(error === 401){
                                toastr.error("Lecturer as Exit as the Exam Officer");
                            }
                            else if(error === 402){
                                toastr.error("Department Already Has Exam Officer");
                            }
                            else{
                                toastr.error("Unable to Add Exam Officer");
                            }
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();