/**
 * Created by Bello J on 4/21/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('LecturerDeleteController',function(Lecturer,lecturerId,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                Lecturer.remove(lecturerId)
                    .then(function(){
                        toastr.success("Lecturer Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Lecturer");
                    });
            };
        });
})();