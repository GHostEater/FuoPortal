/**
 * Created by Bello J on 6/12/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("StudentResultViewController",function(toastr,$modal,Student,Session,Semester,Result,User,Lecturer,lodash,$window,$stateParams){
            var vm = this;
            vm.results = [];
            Semester.get()
                .then(function(data){
                    vm.semester = data;
                });
            Session.getAll()
                .then(function(data){
                    vm.sessions = data;
                    vm.session = lodash.findLast(vm.sessions);
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
                        });
                });
            vm.editCa = function(id){
                var options = {
                    templateUrl: 'app/result/editCa.html',
                    controller: "EditCaController",
                    controllerAs: 'model',
                    size: 'sm',
                    resolve:{
                        id: function(){
                            return id;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        $window.location.reload();
                    });
            };
            vm.editExam = function(id){
                var options = {
                    templateUrl: 'app/result/editExam.html',
                    controller: "EditExamController",
                    controllerAs: 'model',
                    size: 'sm',
                    resolve:{
                        id: function(){
                            return id;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        $window.location.reload();
                    });
            };
            vm.processResult = function(id){
                Result.removeGP(id)
                    .then(function(){
                        Student.getOne(vm.student.matricNo)
                            .then(function(data){
                                vm.s = data;
                                if(vm.s.status == '0'){
                                    Result.getStudentGP(vm.s.matricNo)
                                        .then(function(data){
                                            vm.last = lodash.findLast(data);
                                            var tnu = 0;
                                            var tcp = 0;
                                            var gpa = 0;
                                            var ctcp = 0;
                                            var ctnu = 0;
                                            var cgpa = 0;
                                            var tce = 0;
                                            var dat = {};

                                            if(!vm.last){
                                                for(var j=0; j<vm.result.length; j++){
                                                    tnu += Number(vm.result[j].unit);
                                                }
                                                for(var k=0; k<vm.result.length; k++){
                                                    tcp +=  Number(vm.result[k].gp) * Number(vm.result[k].unit);
                                                }
                                                for(var y=0; y<vm.result.length; y++){
                                                    if(vm.result[y].grade != 'F'){
                                                        tce += Number(vm.result[y].gp);
                                                    }
                                                }
                                                gpa = tcp/tnu;
                                                ctcp = tcp;
                                                ctnu = tnu;
                                                cgpa = ctcp/ctnu;
                                                dat = {
                                                    info: vm.s,
                                                    results: vm.result,
                                                    tnu: tnu,
                                                    ctnu: ctnu,
                                                    tcp: tcp,
                                                    ctcp: ctcp,
                                                    tce: tce,
                                                    gpa: gpa,
                                                    cgpa: cgpa,
                                                    prev_cgpa: 0.00,
                                                    prev_ctcp: 0.00,
                                                    prev_ctnu: 0.00,
                                                    prev_tce: 0
                                                };
                                                Result.processResult(vm.s.matricNo,dat.tcp,dat.ctcp,dat.tnu,
                                                    dat.ctnu,dat.gpa,dat.cgpa,dat.prev_cgpa,dat.prev_ctcp,
                                                    dat.prev_ctnu,dat.prev_tce,dat.tce,vm.session.id,vm.semester.semester)
                                                    .then(function(data){
                                                        toastr.success("Result Processed");
                                                    });
                                            }
                                            else{
                                                for(var l=0; l<vm.result.length; l++){
                                                    tnu += Number(vm.result[l].unit);
                                                }
                                                for(var m=0; m<vm.result.length; m++){
                                                    tcp +=  Number(vm.result[m].gp) * Number(vm.result[m].unit);
                                                }
                                                for(var z=0; z<vm.result.length; z++){
                                                    if(vm.result[z].grade != 'F'){
                                                        tce += Number(vm.result[z].gp);
                                                    }
                                                }
                                                gpa = tcp/tnu;
                                                tce += Number(vm.last.tce);
                                                ctcp = tcp+Number(vm.last.tcp);
                                                ctnu = tnu+Number(vm.last.tnu);
                                                cgpa = ctcp/ctnu;
                                                dat = {
                                                    info: vm.s,
                                                    results: vm.result,
                                                    tnu: tnu,
                                                    ctnu: ctnu,
                                                    tcp: tcp,
                                                    tce: tce,
                                                    ctcp: ctcp,
                                                    gpa: gpa,
                                                    cgpa: cgpa,
                                                    prev_cgpa: vm.last.cgpa,
                                                    prev_ctcp: vm.last.ctcp,
                                                    prev_ctnu: vm.last.ctnu,
                                                    prev_tce: vm.last.tce
                                                };
                                                Result.processResult(vm.s.matricNo,dat.tcp,dat.ctcp,dat.tnu,
                                                    dat.ctnu,dat.gpa,dat.cgpa,dat.prev_cgpa,dat.prev_ctcp,
                                                    dat.prev_ctnu,dat.prev_tce,dat.tce,vm.session.id,vm.semester.semester)
                                                    .then(function(data){
                                                        toastr.success("Result Processed");
                                                    });
                                            }
                                        });
                                }
                            });
                    });
            };
        });
})();