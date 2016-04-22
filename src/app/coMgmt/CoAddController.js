/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('CoAddController',function(Co,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                if(vm.form.$valid){
                    Co.add(vm.lecturerId,vm.firstName,vm.middleName,vm.lastName,vm.collegeId,vm.email,vm.password)
                        .then(function(){
                            toastr.success("Co Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add Co");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();