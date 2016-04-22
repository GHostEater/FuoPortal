
/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('HodDeleteController',function(HOd,lecturerId,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                Hod.remove(lecturerId)
                    .then(function(){
                        toastr.success("Hod Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Hod");
                    });
            };
        });
})();