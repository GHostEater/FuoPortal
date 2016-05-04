/**
 * Created by GHostEater on 04-May-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .directive('csvUpload', function () {
            return {
                restrict: 'E',
                template: '<input type="file" onchange="angular.element(this).scope().handleFiles(this.files)">',
                require: 'ngModel',
                scope: {},
                link: function (scope, element, attrs, ngModel) {
                    scope.handleFiles = function (files) {
                        Papa.parse(files[0], {
                            dynamicTyping: true,
                            complete: function(results) {
                                // you can transform the uploaded data here if necessary
                                // ...
                                ngModel.$setViewValue(results);
                            }
                        });
                    };

                }
            };
        });
})();