/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('AcademicAffairDeleteController',function(AcademicAffair,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                AcademicAffair.remove(id)
                    .then(function(){
                        toastr.success("Academic Affair Officer Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Academic Affair Officer");
                    });
            };
        });
})();