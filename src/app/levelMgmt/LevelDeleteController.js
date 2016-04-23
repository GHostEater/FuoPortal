/**
 * Created by GHostEater on 21-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('LevelDeleteController',function(Level,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                Level.remove(id)
                    .then(function(){
                        toastr.success("Level Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Level");
                    });
            };
        });
})();