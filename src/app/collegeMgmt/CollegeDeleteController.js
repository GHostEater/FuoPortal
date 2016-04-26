/**
 * Created by Bello J on 4/23/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('CollegeDeleteController',function(College,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                College.remove(id)
                    .then(function(){
                        toastr.success("College Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove College");
                    });
            };
        });
})();