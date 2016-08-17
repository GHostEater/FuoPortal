/**
 * Created by Bello J on 6/24/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('StudentAffairEditController',function(StudentAffair,toastr,id,$modalInstance){
            var vm = this;
            StudentAffair.getOne(id)
                .then(function(data){
                    vm.studentAffair = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    StudentAffair.edit(id,vm.studentAffair.firstName,vm.studentAffair.middleName,vm.studentAffair.lastName,
                        vm.studentAffair.email,vm.studentAffair.password,vm.studentAffair.sex,vm.studentAffair.position)
                        .then(function(){
                            toastr.success("Student Affairs Officer Changed");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Change Student Affairs Officer");
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