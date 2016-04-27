/**
 * Created by Bello J on 4/27/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('LecturerRankDeleteController',function(LecturerRank,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                LecturerRank.remove(id)
                    .then(function(){
                        toastr.success("LecturerRank Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove LecturerRank");
                    });
            };
        });
})();