/**
 * Created by Bello J on 5/12/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('LevelAdviserDeleteController',function(LevelAdviser,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                LevelAdviser.remove(id)
                    .then(function(){
                        toastr.success("Level Adviser for the Department Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Level Adviser");
                    });
            };
        });
})();
