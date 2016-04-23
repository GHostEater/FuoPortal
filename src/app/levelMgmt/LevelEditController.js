/**
 * Created by RBpi96 on 23-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('LevelEditController',function(Level,toastr,id,$modalInstance){
            var vm = this;
            Level.getOne(id)
                .then(function(data){
                    vm.level = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    Level.edit(vm.level.id,vm.level.level)
                        .then(function(){
                            toastr.success("Level Changed");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Change Level");
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