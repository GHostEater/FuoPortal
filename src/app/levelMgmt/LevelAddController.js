/**
 * Created by RBpi96 on 23-Apr-2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('LevelAddController',function(Level,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                if(vm.form.$valid){
                    Level.add(vm.level)
                        .then(function(){
                            toastr.success("Level Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add Level");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();
