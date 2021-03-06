/**
 * Created by Bello J on 4/27/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('ModeOfEntryAddController',function(ModeOfEntry,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                if(vm.form.$valid){
                    ModeOfEntry.add(vm.modeOfEntry)
                        .then(function(){
                            toastr.success("Mode of Entry Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add Mode of Entry");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();