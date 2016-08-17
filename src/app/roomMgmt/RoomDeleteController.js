/**
 * Created by Bello J on 6/25/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('RoomDeleteController',function(Room,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                Room.remove(id)
                    .then(function(){
                        toastr.success("Room Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Room");
                    });
            };
        });
})();