/**
 * Created by GHostEater on 09-May-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("MyResultController",function(User,Student,Result,Level,Session,lodash,toastr){
            var vm = this;
            Result.getAll()
                .then(function(data){
                    vm.results = lodash.filter(data,{matricNo:User.profile.id});
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Student.getOne(User.profile.id)
                .then(function(data){
                    vm.student = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Level.getAll()
                .then(function(data){
                    vm.levels = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Session.getAll()
                .then(function(data){
                    vm.sessions = data;
                    vm.session = lodash.findLast(data);
                    vm.sess = vm.session.id;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            vm.changeSession = function(id){
                vm.session = lodash.find(vm.sessions,{id:id});
            };
        });
})();