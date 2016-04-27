/**
 * Created by Bello J on 4/27/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('ModeOfEntryDeleteController',function(ModeOfEntry,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                ModeOfEntry.remove(id)
                    .then(function(){
                        toastr.success("ModeOfEntry Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove ModeOfEntry");
                    });
            };
        });
})();