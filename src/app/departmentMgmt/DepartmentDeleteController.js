/** * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('DepartmentDeleteController',function(Department,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                Department.remove(id)
                    .then(function(){
                        toastr.success("Department Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Department");
                    });
            };
        });
})();