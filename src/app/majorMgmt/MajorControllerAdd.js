/**
 * Created by Bello J on 4/27/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('MajorAddController',function(Major,Department,toastr,$modalInstance){
            var vm = this;
            Department.getAll()
                .then(function(data){
                    vm.departments = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            vm.ok = function(){
                if(vm.form.$valid){
                    Major.add(vm.name,vm.departmentId)
                        .then(function(){
                            toastr.success("Major Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add Major");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();