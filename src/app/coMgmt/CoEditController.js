/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('CoEditController',function(Co,toastr,firstName,$modalInstance){
            var vm = this;
            Co.getOne(firstName)
                .then(function(data){
                    vm.co = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    Co.edit(vm.lecturerId,vm.firstName,vm.middleName,vm.lastName,vm.collegeId,vm.email,vm.password)
                        .then(function(){
                            toastr.success("Co Changed");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Change Co");
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