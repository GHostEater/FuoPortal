/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('AcademicAffairAddController',function(AcademicAffair,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                if(vm.form.$valid){
                    AcademicAffair.add(vm.firstName,vm.middleName,vm.lastName,vm.email,vm.password)
                        .then(function(){
                            toastr.success("Academic Affairs Officer Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add Academic Affairs Officer");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();