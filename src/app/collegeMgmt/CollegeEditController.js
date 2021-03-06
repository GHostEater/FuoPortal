/**
 * Created by Bello J on 4/23/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('CollegeEditController',function(College,toastr,$modalInstance,id){
            var vm = this;
            College.getOne(id)
                .then(function(data){
                    vm.college = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    College.edit(vm.college.id,vm.college.name,vm.college.acronym)
                        .then(function(){
                            toastr.success("College Changed");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Change College");
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