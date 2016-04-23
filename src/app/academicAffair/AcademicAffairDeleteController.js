/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('AcademicAffairDeleteController',function(AcademicAffair,Id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                AcademicAffair.remove(Id)
                    .then(function(){
                        toastr.success("AcademicAffair Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Co");
                    });
            };
        });
})();