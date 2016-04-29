/**
 * Created by Bello J on 4/21/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("StudentController",function(toastr,$modal,Student){
            var vm = this;
            vm.view = view;
            vm.add = add;
            vm.edit = edit;
            vm.remove = remove;
            Student.getAll()
                .then(function(data){
                    vm.students = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            function view(matricNo){
                var options = {
                    templateUrl: 'app/studentMgmt/studentView.html',
                    controller: "StudentViewController",
                    controllerAs: 'model',
                    size: 'lg',
                    resolve:{
                        matricNo: function(){
                            return matricNo;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        Student.getAll()
                            .then(function(data){
                                vm.students = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function add(){
                var options = {
                    templateUrl: 'app/studentMgmt/studentAdd.html',
                    controller: "StudentAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        Student.getAll()
                            .then(function(data){
                                vm.students = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function edit(matricNo){
                var options = {
                    templateUrl: 'app/studentMgmt/studentEdit.html',
                    controller: "StudentEditController",
                    controllerAs: 'model',
                    size: 'lg',
                    resolve:{
                        matricNo: function(){
                            return matricNo;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        Student.getAll()
                            .then(function(data){
                                vm.students = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(matricNo){
                var options = {
                    templateUrl: 'app/studentMgmt/studentDelete.html',
                    controller: "StudentDeleteController",
                    controllerAs: 'model',
                    size: 'sm',
                    resolve:{
                        matricNo: function(){
                            return matricNo;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        Student.getAll()
                            .then(function(data){
                                vm.students = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();