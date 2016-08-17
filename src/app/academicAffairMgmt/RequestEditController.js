/**
 * Created by GHostEater on 16-Aug-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("RequestEditController", function(AcademicAffair,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                AcademicAffair.request(id)
                    .then(function(){
                        toastr.success("Request Sent");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.warning("Error Sending Request");
                    });
            };
        });
})();