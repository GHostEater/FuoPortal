/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('AllocationAddController',function(Allocation,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                if(vm.form.$valid){
                    Allocation.add(vm.lecturerId,vm.code)
                        .then(function(){
                            toastr.success("Allocation Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add Allocation");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();