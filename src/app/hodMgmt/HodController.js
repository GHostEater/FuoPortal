/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("HodController",function(toastr,$modal,Hod){
            var vm = this;
            vm.add = add;
            vm.remove = remove;
            Hod.getAll()
                .then(function(data){
                    vm.hods = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            function add(){
                var options = {
                    templateUrl: 'app/hodMgmt/hodAdd.html',
                    controller: "HodAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        Hod.getAll()
                            .then(function(data){
                                vm.hods = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(id){
                var options = {
                    templateUrl: 'app/hodMgmt/hodDelete.html',
                    controller: "HodDeleteController",
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
                        Hod.getAll()
                            .then(function(data){
                                vm.hods = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();