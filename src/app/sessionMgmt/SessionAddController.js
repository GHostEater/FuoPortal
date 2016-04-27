/**
 * Created by Bello J on 4/27/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('SessionAddController',function(Session,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                if(vm.form.$valid){
                    Session.add(vm.session)
                        .then(function(){
                            toastr.success("Session Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add Session");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();
