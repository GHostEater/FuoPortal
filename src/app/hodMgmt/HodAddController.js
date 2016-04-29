/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('HodAddController',function(Hod,Lecturer,Department,toastr,$modalInstance){
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
                    Hod.add(vm.lecturerId,vm.departmentId)
                        .then(function(){
                            toastr.success("Hod Added");
                            $modalInstance.close();
                        })
                        .catch(function(error){
                            if(error === 401){
                                toastr.error("Lecturer Already Head of Department");
                            }
                            else if(error === 402){
                                toastr.error("Department Already Has Head");
                            }
                            else{
                                toastr.error("Unable to Add HOD");
                            }
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();