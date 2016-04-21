/**
 * Created by Bello J on 4/21/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("StudentController",function(toastr,Student){
            var vm = this;
            vm.edit = edit;
            Student.getAll()
                .then(function(data){
                    vm.students = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
        });
})();