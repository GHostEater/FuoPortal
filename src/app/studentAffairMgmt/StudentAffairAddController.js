/**
 * Created by Bello J on 6/24/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('StudentAffairAddController',function(StudentAffair,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                if(vm.form.$valid){
                    StudentAffair.add(vm.firstName,vm.middleName,vm.lastName,vm.email,vm.password,vm.sex,vm.position)
                        .then(function(){
                            toastr.success("Student Affair Officer Added");
                            $modalInstance.close();
                        })
                        .catch(function(error){
                            if(error == 401){
                                toastr.error("Dean Already Exists");
                            }
                            else if(error == 402){
                                toastr.error("Sub Dean Already Exists for "+vm.sex);
                            }
                            else{
                                toastr.error("Unable to Add Student Affair Officer");
                            }
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();