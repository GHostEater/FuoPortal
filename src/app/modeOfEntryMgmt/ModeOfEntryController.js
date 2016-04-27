/**
 * Created by Bello J on 4/27/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("ModeOfEntryController",function(toastr,$modal,ModeOfEntry){
            var vm = this;
            vm.add = add;
            vm.edit = edit;
            vm.remove = remove;
            ModeOfEntry.getAll()
                .then(function(data){
                    vm.modeOfEntries = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            function add(){
                var options = {
                    templateUrl: 'app/modeOfEntryMgmt/modeOfEntryAdd.html',
                    controller: "modeOfEntryAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        ModeOfEntry.getAll()
                            .then(function(data){
                                vm.modeOfEntries = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function edit(id){
                var options = {
                    templateUrl: 'app/modeOfEntryMgmt/modeOfEntryEdit.html',
                    controller: "modeOfEntryEditController",
                    controllerAs: 'model',
                    size: 'lg',
                    resolve:{
                        id: function(){
                            return id;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        ModeOfEntry.getAll()
                            .then(function(data){
                                vm.modeOfEntries = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(id){
                var options = {
                    templateUrl: 'app/modeOfEntryMgmt/modeOfEntryDelete.html',
                    controller: "modeOfEntryDeleteController",
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
                        ModeOfEntry.getAll()
                            .then(function(data){
                                vm.modeOfEntries = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();