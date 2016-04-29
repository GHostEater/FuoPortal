/**
 * Created by GHostEater on 29-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('LecturerStatusDeleteController',function(LecturerStatus,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                LecturerStatus.remove(id)
                    .then(function(){
                        toastr.success("Lecturer Status Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Lecturer Status");
                    });
            };
        });
})();