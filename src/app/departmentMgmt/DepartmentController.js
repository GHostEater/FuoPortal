/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("DepartmentController",function(toastr,$modal,Department){
            var vm = this;
            vm.add = add;
            vm.edit = edit;
            vm.remove = remove;
            Department.getAll()
                .then(function(data){
                    vm.departments = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            function add(){
                var options = {
                    templateUrl: 'app/departmentMgmt/departmentAdd.html',
                    controller: "DepartmentAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        Department.getAll()
                            .then(function(data){
                                vm.departments = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function edit(name){
                var options = {
                    templateUrl: 'app/departmentMgmt/departmentEdit.html',
                    controller: "DepartmentEditController",
                    controllerAs: 'model',
                    size: 'lg',
                    resolve:{
                        code: function(){
                            return name;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        Department.getAll()
                            .then(function(data){
                                vm.departments = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(name){
                var options = {
                    templateUrl: 'app/departmentMgmt/departmentDelete.html',
                    controller: "DepartmentDeleteController",
                    controllerAs: 'model',
                    size: 'sm',
                    resolve:{
                        name: function(){
                            return name;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        Department.getAll()
                            .then(function(data){
                                vm.departments = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();