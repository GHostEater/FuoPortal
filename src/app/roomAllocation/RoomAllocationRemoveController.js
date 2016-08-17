/**
 * Created by Bello J on 6/28/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('RoomAllocationRemoveController',function(RoomAllocation,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                RoomAllocation.remove(id)
                    .then(function(){
                        toastr.success("Room Allocation Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Room Allocation");
                    });
            };
        });
})();