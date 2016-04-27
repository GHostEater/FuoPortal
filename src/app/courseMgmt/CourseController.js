/**
 * Created by GHostEater on 15-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("CourseController",function(toastr,$modal,Course,Prerequisite){
            var vm = this;
            vm.add = add;
            vm.edit = edit;
            vm.remove = remove;
            Course.getAll()
                .then(function(data){
                    vm.courses = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Prerequisite.getAll()
                .then(function(data){
                    vm.pres = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });


            function add(){
                var options = {
                    templateUrl: 'app/courseMgmt/courseAdd.html',
                    controller: "CourseAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        Course.getAll()
                            .then(function(data){
                                vm.courses = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function edit(code){
                var options = {
                    templateUrl: 'app/courseMgmt/courseEdit.html',
                    controller: "CourseEditController",
                    controllerAs: 'model',
                    size: 'lg',
                    resolve:{
                        code: function(){
                            return code;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        Course.getAll()
                            .then(function(data){
                                vm.courses = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(code){
                var options = {
                    templateUrl: 'app/courseMgmt/courseDelete.html',
                    controller: "CourseDeleteController",
                    controllerAs: 'model',
                    size: 'sm',
                    resolve:{
                        code: function(){
                            return code;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        Course.getAll()
                            .then(function(data){
                                vm.courses = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();