/**
 * Created by Bello J on 5/23/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('EditCaController',function(Result,AcademicAffair,toastr,id,$modalInstance,User){
            var vm = this;
            Result.getOne(id)
                .then(function(data){
                    vm.result = data;
                    vm.prevScore = vm.result.ca;
                });

            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    Result.editCa(vm.result.id,vm.result.ca)
                        .then(function(){
                            toastr.success("Ca Changed");
                            var date = new Date();
                            AcademicAffair.logEdit(vm.result.id,'CA',vm.prevScore,vm.result.ca,date,User.profile.id)
                                .then(function(){
                                    toastr.success('Edit Logged');
                                    $modalInstance.close();
                                })
                                .catch(function(){
                                    toastr.error('Unable to Log Edit... Try Again');
                                });
                        })
                        .catch(function(){
                            toastr.error("Unable to Change Ca");
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