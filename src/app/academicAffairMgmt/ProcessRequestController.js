/**
 * Created by GHostEater on 16-Aug-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("ProcessRequestController", function(AcademicAffair,id,status,handledBy,toastr,$modalInstance){
            var vm = this;
            vm.status = status;

            vm.ok = function(){
                var date = new Date();
                AcademicAffair.processRequest(id,status,date,handledBy)
                    .then(function(){
                        if(status == 1){
                            toastr.success("Edit Request Approved");
                        }
                        else if(status == 2){
                            toastr.success("Edit Request Declined");
                        }
                        $modalInstance.close();
                    })
                    .catch(function(){
                        if(status == 1){
                            toastr.error("Unable to Approve Edit Request");
                        }
                        else if(status == 2){
                            toastr.error("Unable to Decline Edit Request");
                        }
                    });
            };
        });
})();