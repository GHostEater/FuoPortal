/**
 * Created by GHostEater on 29-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("StudentViewController",function(matricNo,$modalInstance,toastr,Student,Host){
            var vm = this;
            vm.host = Host.host;
            Student.getOne(matricNo)
                .then(function(data){
                    vm.student = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
        });
})();