
/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('HodDeleteController',function(Hod,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                Hod.remove(id)
                    .then(function(){
                        toastr.success("Head of Department Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Head of Department");
                    });
            };
        });
})();