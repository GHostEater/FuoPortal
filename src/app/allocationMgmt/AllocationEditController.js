/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("AllocationController",function(toastr,$modal,Allocation){
            var vm = this;
            vm.add = add;
            vm.edit = edit;
            vm.remove = remove;
            Allocation.getAll()
                .then(function(data){
                    vm.allocations = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            function add(){
                var options = {
                    templateUrl: 'app/allocationMgmt/allocationAdd.html',
                    controller: "AllocationAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        Allocation.getAll()
                            .then(function(data){
                                vm.allocations = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function edit(Id){
                var options = {
                    templateUrl: 'app/allocationMgmt/allocationEdit.html',
                    controller: "AllocationEditController",
                    controllerAs: 'model',
                    size: 'lg',
                    resolve:{
                        lecturerId: function(){
                            return Id;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        Allocation.getAll()
                            .then(function(data){
                                vm.allocations = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(Id){
                var options = {
                    templateUrl: 'app/allocationMgmt/allocationDelete.html',
                    controller: "AllocationDeleteController",
                    controllerAs: 'model',
                    size: 'sm',
                    resolve:{
                        lecturerId: function(){
                            return Id;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        Allocation.getAll()
                            .then(function(data){
                                vm.allocations = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();