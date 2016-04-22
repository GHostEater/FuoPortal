/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('HodAddController',function(Hod,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                if(vm.form.$valid){
                    Hod.add(vm.lecturerId,vm.departmentId)
                        .then(function(){
                            toastr.success("Hod Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add Hod");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();