/**
 * Created by GHostEater on 15-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("HomeController",function(User,toastr){
            var vm = this;
            vm.user = User.profile;
        });
})();