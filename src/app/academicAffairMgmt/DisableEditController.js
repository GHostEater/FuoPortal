/**
 * Created by GHostEater on 16-Aug-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("DisableEditController", function(AcademicAffair,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                AcademicAffair.disableEdit(id)
                    .then(function(){
                        toastr.success("Edit Disabled");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Academic Affair Officer");
                    });
            };
        });
})();