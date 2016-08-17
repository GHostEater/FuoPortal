/**
 * Created by Bello J on 6/28/2016.
 */
angular.module('fuoPortal')
    .controller("RoomAllocationController",function(RoomAllocation,Hostel,Room,Session,lodash,$modal){
        var vm = this;
        vm.select = 0;
        vm.showList = showList;
        vm.showRooms = showRooms;
        vm.allocate = allocate;
        vm.remove = remove;
        vm.members = [];
        vm.rs = [];
        Session.getAll()
            .then(function(data){
                vm.session = lodash.findLast(data);
                RoomAllocation.getAll()
                    .then(function(data){
                        vm.allocations = lodash.filter(data,{sessionId:vm.session.id});
                        Room.getAll()
                            .then(function(data){
                                vm.roo = data;
                                Hostel.getAll()
                                    .then(function(data){
                                        vm.hostels = data;
                                        for(var i=0; i<vm.hostels.length; i++){
                                            vm.hostel = vm.hostels[i];
                                            vm.rs = [];
                                            vm.rooms = lodash.filter(vm.roo,{hostelId:vm.hostel.id});
                                            for(var j=0; j<vm.rooms.length; j++){
                                                vm.allocs = lodash.filter(vm.allocations,{roomId:vm.rooms[j].id});
                                                var room = {
                                                    name: vm.rooms[j].name,
                                                    members: vm.allocs
                                                };
                                                vm.rs.push(room);
                                            }
                                            var dat = {
                                                hostel: vm.hostel,
                                                rooms: vm.rs
                                            };
                                            vm.members.push(dat);
                                        }
                                    });
                            });
                    });
            });

        function showList(){
            vm.select = 0;
        }
        function showRooms(){
            vm.select = 1;
        }
        function allocate(){
            var options = {
                templateUrl: 'app/roomAllocation/allocate.html',
                controller: "RoomAllocateController",
                controllerAs: 'model',
                size: 'lg'
            };
            $modal.open(options).result
                .then(function(){
                    RoomAllocation.getAll()
                        .then(function(data){
                            vm.allocations = lodash.filter(data,{sessionId:vm.session.id});
                        });
                });
        }
        function remove(id){
            var options = {
                templateUrl: 'app/roomAllocation/remove.html',
                controller: "RoomAllocationRemoveController",
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
                    RoomAllocation.getAll()
                        .then(function(data){
                            vm.allocations = lodash.filter(data,{sessionId:vm.session.id});
                        });
                });
        }
    });