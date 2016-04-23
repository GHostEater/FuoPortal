/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("AllocationController",function(toastr,$modal,Allocation){
            var vm = this;
            vm.allocate = allocate;
            vm.remove = remove;
            Allocation.getAll()
                .then(function(data){
                    vm.allocations = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            function allocate(){
                var options = {
                    templateUrl: 'app/allocationMgmt/allocate.html',
                    controller: "AllocateController",
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
            function remove(id){
                var options = {
                    templateUrl: 'app/allocationMgmt/allocationDelete.html',
                    controller: "AllocationDeleteController",
                    controllerAs: 'model',
                    size: 'sm',
                    resolve:{
                        id: function(){
                            return id;
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