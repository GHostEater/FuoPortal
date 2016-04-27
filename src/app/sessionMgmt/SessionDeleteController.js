/**
 * Created by Bello J on 4/27/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('SessionDeleteController',function(Session,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                Session.remove(id)
                    .then(function(){
                        toastr.success("Session Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Session");
                    });
            };
        });
})();