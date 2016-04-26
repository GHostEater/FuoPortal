/**
 * Created by Bello J on 4/23/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('CollegeAddController',function(College,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                if(vm.form.$valid){
                    College.add(vm.name,vm.acronym)
                        .then(function(){
                            toastr.success("College Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add College");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();