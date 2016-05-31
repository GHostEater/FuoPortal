/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('CoEditController',function(Co,College,toastr,id,$modalInstance){
            var vm = this;
            Co.getOne(id)
                .then(function(data){
                    vm.co = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            College.getAll()
                .then(function(data){
                    vm.colleges = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    Co.edit(id,vm.co.firstName,vm.co.middleName,vm.co.lastName,vm.co.collegeId,vm.co.email,vm.co.password)
                        .then(function(){
                            toastr.success("College Officer Changed");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Change College Officer");
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