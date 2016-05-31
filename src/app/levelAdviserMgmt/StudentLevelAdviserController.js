/**
 * Created by Bello J on 5/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("StudentLevelAdviserController",function(User,$modal,toastr,Student,lodash){
            var vm = this;
            vm.user = User.profile;
            vm.view = view;
            Student.getAll()
                .then(function(data){
                    vm.s = data;
                    vm.students = lodash.filter(data,{levelAdviserId: User.profile.id});
                })
                .catch(function(){
                    toastr.warning("Could Not Connect To Server");
                });
            function view(matricNo){
                var options = {
                    templateUrl: 'app/studentMgmt/studentView.html',
                    controller: "StudentViewController",
                    controllerAs: 'model',
                    size: 'lg',
                    resolve:{
                        matricNo: function(){
                            return matricNo;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        Student.getAll()
                            .then(function(data){
                                vm.students = lodash.filter(data,{levelAdviserId: User.profile.id});
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();