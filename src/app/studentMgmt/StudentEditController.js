/**
 * Created by Bello J on 4/21/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('StudentEditController',function(Student,toastr,matricNo,$modalInstance){
            var vm = this;
            Student.getOne(matricNo)
                .then(function(data){
                    vm.student = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    Stduent.edit(vm.matricNo,vm.firstName,vm.middleName,vm.lastName,vm.collegeId,vm.departmentId,vm.majorId,vm.level,vm.mode_of_entry,vm.session,vm.dateBirth,vm.email,vm.address,vm.password)
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