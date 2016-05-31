/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('CoAddController',function(Co,College,toastr,$modalInstance){
            var vm = this;

            College.getAll()
                .then(function(data){
                    vm.colleges = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            vm.ok = function(){
                if(vm.form.$valid){
                    Co.add(vm.firstName,vm.middleName,vm.lastName,vm.collegeId,vm.email,vm.password)
                        .then(function(){
                            toastr.success("College Officer Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add College Officer");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();