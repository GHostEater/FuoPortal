/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('CoDeleteController',function(Co,lecturerId,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                Co.remove(lecturerId)
                    .then(function(){
                        toastr.success("Co Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Co");
                    });
            };
        });
})();