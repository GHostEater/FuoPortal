/**
 * Created by GHostEater on 29-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("LecturerStatusController",function(LecturerStatus,toastr,$modal){
            var vm = this;
            vm.add = add;
            vm.edit = edit;
            vm.remove = remove;
            LecturerStatus.getAll()
                .then(function(data){
                    vm.lecturerStatuss = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            function add(){
                var options = {
                    templateUrl: 'app/lecturerStatusMgmt/lecturerStatusAdd.html',
                    controller: "LecturerStatusAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        LecturerStatus.getAll()
                            .then(function(data){
                                vm.lecturerStatuss = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function edit(id){
                var options = {
                    templateUrl: 'app/lecturerStatusMgmt/lecturerStatusEdit.html',
                    controller: "LecturerStatusEditController",
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
                        LecturerStatus.getAll()
                            .then(function(data){
                                vm.lecturerStatuss = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(id){
                var options = {
                    templateUrl: 'app/lecturerStatusMgmt/lecturerStatusDelete.html',
                    controller: "LecturerStatusDeleteController",
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
                        LecturerStatus.getAll()
                            .then(function(data){
                                vm.lecturerStatuss = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();