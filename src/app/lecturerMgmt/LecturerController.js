/**
 * Created by Bello J on 4/21/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("LecturerController",function(toastr,$modal,Lecturer){
            var vm = this;
            vm.add = add;
            vm.edit = edit;
            vm.remove = remove;
            Lecturer.getAll()
                .then(function(data){
                    vm.lecturers = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            function add(){
                var options = {
                    templateUrl: 'app/lecturerMgmt/lecturerAdd.html',
                    controller: "LecturerAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        Lecturer.getAll()
                            .then(function(data){
                                vm.lecturers = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function edit(id){
                var options = {
                    templateUrl: 'app/lecturerMgmt/lecturerEdit.html',
                    controller: "LecturerEditController",
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
                        Lecturer.getAll()
                            .then(function(data){
                                vm.lecturers = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(id){
                var options = {
                    templateUrl: 'app/lecturerMgmt/lecturerDelete.html',
                    controller: "LecturerDeleteController",
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
                        Lecturer.getAll()
                            .then(function(data){
                                vm.lecturers = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();