/**
 * Created by GHostEater on 19-Feb-16.
 */
(function () {
    'use strict';
angular.module('fuoPortal')
    .controller("LoginController",function(Auth,$location,User,toastr){
        var vm = this;
        vm.user = User.profile;
        vm.login = login;
        if(vm.user.loggedIn){
            $location.url('/home');
        }

        function login(username,password){
            vm.userError = false;
            vm.passError = false;
            Auth.login(username,password)
                .then(function(data){
                    User.setUser(data.name,data.firstName,data.middleName,data.lastName,data.id,data.sysRank,data.level);
                    toastr.success("Login Successful");
                    $location.url('/home');
                })
                .catch(function(error){
                    if(error === 401){
                        toastr.error("Incorrect Username");
                        vm.userError = true;
                    }
                    else if(error === 402){
                        toastr.error("Incorrect Password");
                        vm.passError = true;
                    }
                    else{
                        toastr.warning("Could not Connect to Server");
                    }
                });
        }
    });
})();