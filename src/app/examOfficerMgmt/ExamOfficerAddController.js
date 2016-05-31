/**
 * Created by Bello J on 5/12/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('ExamOfficerAddController',function(ExamOfficer,Lecturer,Department,toastr,$modalInstance){
            var vm = this;
            Lecturer.getAll()
                .then(function(data){
                    vm.lecturers = data;
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
                    ExamOfficer.add(vm.lecturerId,vm.departmentId)
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