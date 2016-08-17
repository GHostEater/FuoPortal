/**
 * Created by Bello J on 5/12/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("LevelAdviserController",function(toastr,$modal,LevelAdviser){
            var vm = this;
            vm.add = add;
            vm.assignStudent = assignStudent;
            vm.remove = remove;
            LevelAdviser.getAll()
                .then(function(data){
                    vm.levelAdvisers = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            function add(){
                var options = {
                    templateUrl: 'app/levelAdviserMgmt/levelAdviserAdd.html',
                    controller: "LevelAdviserAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        LevelAdviser.getAll()
                            .then(function(data){
                                vm.levelAdvisers = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function assignStudent(id){
                var options = {
                    templateUrl: 'app/levelAdviserMgmt/forAssignLevelAdviser.html',
                    controller: "ForAssignLevelAdviserController",
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
                        LevelAdviser.getAll()
                            .then(function(data){
                                vm.levelAdvisers = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(id){
                var options = {
                    templateUrl: 'app/levelAdviserMgmt/levelAdviserDelete.html',
                    controller: "LevelAdviserDeleteController",
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
                        LevelAdviser.getAll()
                            .then(function(data){
                                vm.levelAdvisers = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();
