/**
 * Created by Bello J on 4/27/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("MajorController",function(toastr,$modal,Major){
            var vm = this;
            vm.add = add;
            vm.edit = edit;
            vm.remove = remove;
            Major.getAll()
                .then(function(data){
                    vm.majors = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            function add(){
                var options = {
                    templateUrl: 'app/majorMgmt/majorAdd.html',
                    controller: "MajorAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        Major.getAll()
                            .then(function(data){
                                vm.majors = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function edit(name){
                var options = {
                    templateUrl: 'app/majorMgmt/majorEdit.html',
                    controller: "MajorEditController",
                    controllerAs: 'model',
                    size: 'lg',
                    resolve:{
                        name: function(){
                            return name;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        Major.getAll()
                            .then(function(data){
                                vm.majors = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(name){
                var options = {
                    templateUrl: 'app/majorMgmt/majorDelete.html',
                    controller: "MajorDeleteController",
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
                        Major.getAll()
                            .then(function(data){
                                vm.majors = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();