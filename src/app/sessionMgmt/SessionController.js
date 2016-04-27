/**
 * Created by Bello J on 4/27/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("SessionController",function(toastr,$modal,Session){
            var vm = this;
            vm.add = add;
            vm.edit = edit;
            vm.remove = remove;
            Session.getAll()
                .then(function(data){
                    vm.sessions = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            function add(){
                var options = {
                    templateUrl: 'app/sessionMgmt/sessionAdd.html',
                    controller: "SessionAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        Session.getAll()
                            .then(function(data){
                                vm.sessions = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function edit(id){
                var options = {
                    templateUrl: 'app/sessionMgmt/sessionEdit.html',
                    controller: "SessionEditController",
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
                        Session.getAll()
                            .then(function(data){
                                vm.sessions = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(id){
                var options = {
                    templateUrl: 'app/sessionMgmt/sessionDelete.html',
                    controller: "SessionDeleteController",
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
                        Session.getAll()
                            .then(function(data){
                                vm.sessions = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();