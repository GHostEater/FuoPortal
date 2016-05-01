/**
 * Created by Bello J on 4/27/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("LecturerRankController",function(toastr,$modal,LecturerRank){
            var vm = this;
            vm.add = add;
            vm.edit = edit;
            vm.remove = remove;
            LecturerRank.getAll()
                .then(function(data){
                    vm.lecturerRanks = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            function add(){
                var options = {
                    templateUrl: 'app/lecturerRankMgmt/lecturerRankAdd.html',
                    controller: "LecturerRankAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        LecturerRank.getAll()
                            .then(function(data){
                                vm.lecturerRank = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function edit(id){
                var options = {
                    templateUrl: 'app/lecturerRankMgmt/lecturerRankEdit.html',
                    controller: "LecturerRankEditController",
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
                        LecturerRank.getAll()
                            .then(function(data){
                                vm.lecturerRanks = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(id){
                var options = {
                    templateUrl: 'app/lecturerRankMgmt/lecturerRankDelete.html',
                    controller: "LecturerRankDeleteController",
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
                        LecturerRank.getAll()
                            .then(function(data){
                                vm.LecturerRank = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();