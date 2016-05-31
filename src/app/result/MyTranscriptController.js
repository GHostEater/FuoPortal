/**
 * Created by Bello J on 5/19/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("MyTranscriptController",function($q,Result,Student,lodash,toastr,$stateParams,Session){
            var vm = this;
            vm.results = [];
            Session.getAll()
                .then(function(data){
                    vm.sessions = data;
                });

            Student.getOneById($stateParams.id)
                .then(function(data){
                    vm.student = data;
                    Result.getStudentGP(vm.student.matricNo)
                        .then(function(data){
                            vm.gps = data;
                            var j=0;
                            for(var i=0; i<vm.gps.length; i++){
                                Result.getForStudent(vm.student.matricNo)
                                    .then(function(data){
                                        vm.result = lodash.filter(data,{sessionId:vm.gps[j].sessionId,semester:vm.gps[j].semester});
                                        var dat = {
                                            result: vm.result,
                                            gp: vm.gps[j]
                                        };
                                        vm.results.push(dat);
                                        j+=1;
                                    });
                            }
                        })
                })
        });
})();