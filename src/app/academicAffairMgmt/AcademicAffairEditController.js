/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('AcademicAffairEditController',function(AcademicAffair,toastr,id,$modalInstance){
            var vm = this;
            AcademicAffair.getOne(id)
                .then(function(data){
                    vm.academicAffair = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    AcademicAffair.edit(id,vm.academicAffair.firstName,vm.academicAffair.middleName,vm.academicAffair.lastName,
                        vm.academicAffair.email,vm.academicAffair.password)
                        .then(function(){
                            toastr.success("Academic Affairs Officer Changed");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Change Academic Affairs Officer");
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