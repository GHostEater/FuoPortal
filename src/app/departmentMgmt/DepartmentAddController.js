/** * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('DepartmentAddController',function(Department,College,toastr,$modalInstance){
            var vm = this;
            College.getAll()
                .then(function(data){
                    vm.colleges = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            vm.ok = function(){
                if(vm.form.$valid){
                    Department.add(vm.name,vm.collegeId)
                        .then(function(){
                            toastr.success("Department Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add Department");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();