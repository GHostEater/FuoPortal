/**
 * Created by RBpi96 on 23-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("CollegeController",function(toastr,$modal,College){
            var vm = this;
            vm.add = add;
            vm.edit = edit;
            vm.remove = remove;
            College.getAll()
                .then(function(data){
                    vm.colleges = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            function add(){
                var options = {
                    templateUrl: 'app/collegeMgmt/collegeAdd.html',
                    controller: "CollegeAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        College.getAll()
                            .then(function(data){
                                vm.colleges = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function edit(id){
                var options = {
                    templateUrl: 'app/collegeMgmt/collegeEdit.html',
                    controller: "CollegeEditController",
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
                        College.getAll()
                            .then(function(data){
                                vm.colleges = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(id){
                var options = {
                    templateUrl: 'app/collegeMgmt/collegeDelete.html',
                    controller: "CollegeDeleteController",
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
                        College.getAll()
                            .then(function(data){
                                vm.colleges = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();