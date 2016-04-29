/**
 * Created by Bello J on 4/27/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('ModeOfEntryEditController',function(ModeOfEntry,toastr,id,$modalInstance){
            var vm = this;
            ModeOfEntry.getOne(id)
                .then(function(data){
                    vm.modeOfEntry = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    ModeOfEntry.edit(vm.modeOfEntry.id,vm.modeOfEntry.modeOfEntry)
                        .then(function(){
                            toastr.success("ModeOfEntry Changed");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Change ModeOfEntry");
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