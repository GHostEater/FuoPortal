/**
 * Created by Bello J on 5/23/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('EditCaController',function(Result,toastr,id,$modalInstance){
            var vm = this;
            Result.getOne(id)
                .then(function(data){
                    vm.result = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    Result.editCa(vm.result.id,vm.result.ca)
                        .then(function(){
                            toastr.success("Ca Changed");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Change Ca");
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