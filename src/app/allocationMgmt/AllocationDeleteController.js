/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('AllocationDeleteController',function(Allocation,Id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                Allocation.remove(lecturerId)
                    .then(function(){
                        toastr.success("Allocation Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Allocation");
                    });
            };
        });
})();