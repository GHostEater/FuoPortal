/**
 * Created by GHostEater on 19-Feb-16.
 */
(function () {
    'use strict';
angular.module('fuoPortal')
    .factory("User",function(localStorage){

        var USER_INFO = "fuoPortalUser";

        function initialize(){
            var user = {
                username: '',
                name: '',
                id: '',
                get loggedIn(){
                    return this.id;
                }
            };
            var localUser = localStorage.get(USER_INFO);
            if(localUser){
                user.username = localUser.username;
                user.name = localUser.name;
                user.id = localUser.id;
            }
            return user;
        }

        function setUser(username,name,id){
            profile.username = username;
            profile.name = name;
            profile.id = id;

            localStorage.add(USER_INFO,profile);
        }

        function logOut(){
            localStorage.remove(USER_INFO);
        }

        var profile = initialize();

        return{
            profile: profile,
            setUser: setUser,
            logOut: logOut
        }
    });
})();