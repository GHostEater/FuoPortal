/**
 * Created by Bello J on 4/27/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('MajorDeleteController',function(Major,name,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                Major.remove(name)
                    .then(function(){
                        toastr.success("Major Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Major");
                    });
            };
        });
})();