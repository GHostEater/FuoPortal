/**
 * Created by GHostEater on 17-Aug-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("ResultEditLogsController", function (AcademicAffair) {
            var vm = this;
            AcademicAffair.getEditLogs()
                .then(function(data){
                    vm.logs = data;
                });
        });
})();