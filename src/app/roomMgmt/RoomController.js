/**
 * Created by Bello J on 6/25/2016.
 */
angular.module("fuoPortal")
    .controller("RoomController",function(Room,$modal){
        var vm = this;
        vm.add = add;
        vm.edit = edit;
        vm.remove = remove;
        Room.getAll()
            .then(function(data){
                vm.rooms = data;
            });

        function add(){
            var options = {
                templateUrl: 'app/roomMgmt/roomAdd.html',
                controller: "RoomAddController",
                controllerAs: 'model',
                size: 'lg'
            };
            $modal.open(options).result
                .then(function(){
                    Room.getAll()
                        .then(function(data){
                            vm.rooms = data;
                        });
                });
        }
        function edit(id){
            var options = {
                templateUrl: 'app/roomMgmt/roomEdit.html',
                controller: "RoomEditController",
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
                    Room.getAll()
                        .then(function(data){
                            vm.rooms = data;
                        });
                });
        }
        function remove(id){
            var options = {
                templateUrl: 'app/roomMgmt/roomDelete.html',
                controller: "RoomDeleteController",
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
                    Room.getAll()
                        .then(function(data){
                            vm.rooms = data;
                        });
                });
        }
    });