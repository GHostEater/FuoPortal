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
                name: '',
                firstName: '',
                middleName: '',
                lastName: '',
                id: '',
                sysRank: '',
                level: '',
                get loggedIn(){
                    return this.id;
                }
            };
            var localUser = localStorage.get(USER_INFO);
            if(localUser){
                user.name = localUser.name;
                user.firstName = localUser.firstName;
                user.middleName = localUser.middleName;
                user.lastName = localUser.lastName;
                user.id = localUser.id;
                user.sysRank = localUser.sysRank;
                user.level = localUser.level;
            }
            return user;
        }

        function setUser(name,firstName,middleName,lastName,id,sysRank,level){
            profile.name = name;
            profile.firstName = firstName;
            profile.middleName = middleName;
            profile.lastName = lastName;
            profile.id = id;
            profile.sysRank = sysRank;
            profile.level = level;

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