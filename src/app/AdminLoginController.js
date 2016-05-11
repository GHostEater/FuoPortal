/**
 * Created by GHostEater on 11-May-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("AdminLoginController",function(Auth,$location,User,toastr){
            var vm = this;
            vm.user = User.profile;
            vm.login = login;
            if(vm.user.loggedIn){
                $location.url('/home');
            }

            function login(username,password,position){
                vm.userError = false;
                vm.passError = false;
                if(vm.form.$valid){
                    Auth.adminLogin(username,password,position)
                        .then(function(data){
                            User.setUser(data.name,data.firstName,data.middleName,data.lastName,data.id,data.sysRank);
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
                else{
                    toastr.error("Errors in Login Form");
                }
            }
        });
})();