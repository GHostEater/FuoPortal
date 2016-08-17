/**
 * Created by Bello J on 6/25/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('HostelDeleteController',function(Hostel,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                Hostel.remove(id)
                    .then(function(){
                        toastr.success("Hostel Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Hostel");
                    });
            };
        });
})();