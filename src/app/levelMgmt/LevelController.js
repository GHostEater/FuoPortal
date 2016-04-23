/**
 * Created by RBpi96 on 23-Apr-2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("LevelController",function(toastr,$modal,Level){
            var vm = this;
            vm.add = add;
            vm.edit = edit;
            vm.remove = remove;
            Level.getAll()
                .then(function(data){
                    vm.levels = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            function add(){
                var options = {
                    templateUrl: 'app/levelMgmt/levelAdd.html',
                    controller: "LevelAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        Level.getAll()
                            .then(function(data){
                                vm.levels = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function edit(Id){
                var options = {
                    templateUrl: 'app/levelMgmt/levelEdit.html',
                    controller: "LevelEditController",
                    controllerAs: 'model',
                    size: 'lg',
                    resolve:{
                        code: function(){
                            return Id;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        Level.getAll()
                            .then(function(data){
                                vm.levels = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(Id){
                var options = {
                    templateUrl: 'app/levelMgmt/levelDelete.html',
                    controller: "LevelDeleteController",
                    controllerAs: 'model',
                    size: 'sm',
                    resolve:{
                        code: function(){
                            return Id;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        Level.getAll()
                            .then(function(data){
                                vm.levels = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();