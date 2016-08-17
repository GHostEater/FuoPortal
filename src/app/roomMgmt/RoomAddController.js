/**
 * Created by Bello J on 6/25/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('RoomAddController',function(Room,Hostel,toastr,$modalInstance){
            var vm = this;
            Hostel.getAll()
                .then(function(data){
                    vm.hostels = data;
                });

            vm.ok = function(){
                if(vm.form.$valid){
                    Room.add(vm.name,vm.hostelId)
                        .then(function(){
                            toastr.success("Room Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add Room");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();