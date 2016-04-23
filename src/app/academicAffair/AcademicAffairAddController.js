/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('AcademicAffairsAddController',function(AcademicAffairs,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                if(vm.form.$valid){
                    AcademicAffairs.add(vm.lecturerId,vm.firstName,vm.middleName,vm.lastName,vm.email,vm.password)
                        .then(function(){
                            toastr.success("AcademicAffairs Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add AcademicAffairs");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();