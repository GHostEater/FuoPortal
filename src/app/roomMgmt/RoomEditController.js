/**
 * Created by Bello J on 6/25/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('RoomEditController',function(Room,Hostel,toastr,id,$modalInstance){
            var vm = this;
            Room.getOne(id)
                .then(function(data){
                    vm.room = data;
                });
            Hostel.getAll()
                .then(function(data){
                    vm.hostels = data;
                });

            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    Room.edit(vm.room.id,vm.room.name,vm.room.hostelId)
                        .then(function(){
                            toastr.success("Room Changed");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Change Room");
                        });
                }
                else if(vm.form.$pristine && vm.form.$valid){
                    toastr.info("No Changes");
                    $modalInstance.close();
                }
                else if(vm.form.$invalid){
                    toastr.error("Errors in form");
                }
            };
        });
})();