/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('AcademicAffairEditController',function(AcademicAffair,toastr,Id,$modalInstance){
            var vm = this;
            AcademicAffair.getOne(Id)
                .then(function(data){
                    vm.academicAffairs = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    AcademicAffair.edit(vm.Id,vm.firstName,vm.middleName,vm.lastName,vm.email,vm.password)
                        .then(function(){
                            toastr.success("AcademicAffair Changed");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Change AcademicAffair");
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