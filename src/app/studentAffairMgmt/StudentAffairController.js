/**
 * Created by Bello J on 6/24/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("StudentAffairController",function(toastr,$modal,StudentAffair){
            var vm = this;
            vm.add = add;
            vm.edit = edit;
            vm.remove = remove;
            StudentAffair.getAll()
                .then(function(data){
                    vm.studentAffairs = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            function add(){
                var options = {
                    templateUrl: 'app/studentAffairMgmt/studentAffairAdd.html',
                    controller: "StudentAffairAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        StudentAffair.getAll()
                            .then(function(data){
                                vm.studentAffairs = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function edit(id){
                var options = {
                    templateUrl: 'app/studentAffairMgmt/studentAffairEdit.html',
                    controller: "StudentAffairEditController",
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
                        StudentAffair.getAll()
                            .then(function(data){
                                vm.studentAffairs = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(id){
                var options = {
                    templateUrl: 'app/studentAffairMgmt/studentAffairDelete.html',
                    controller: "StudentAffairDeleteController",
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
                        StudentAffair.getAll()
                            .then(function(data){
                                vm.studentAffairs = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();