/**
 * Created by Bello J on 4/27/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('SessionEditController',function(Session,toastr,id,$modalInstance){
            var vm = this;
            Session.getOne(id)
                .then(function(data){
                    vm.session = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    Session.edit(vm.session.id,vm.session.session)
                        .then(function(){
                            toastr.success("Session Changed");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Change Session");
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