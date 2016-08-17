/**
 * Created by GHostEater on 08-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .factory('Host',function(){
            var host = 'http://localhost/fuoportal';
            return{
                host: host
            }
        });
})();