/**
 * Created by GHostEater on 10-May-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("ResultComputationController",function(User,Lecturer,Result,Level,Student,Session,Semester,lodash,toastr,$window){
            var vm = this;
            vm.students = [];
            Level.getAll()
                .then(function(data){
                    vm.levels = data;
                });
            Session.getAll()
                .then(function(data){
                    vm.sessions = data;
                    vm.session = lodash.findLast(data);
                });
            Semester.get()
                .then(function(data){
                    vm.semester = data;
                });
            Result.getAllGP()
                .then(function(data){
                    vm.gps = data;
                });
            Lecturer.getOne(User.profile.id)
                .then(function(data){
                    vm.lecturer = data;
                    Result.getAll()
                        .then(function(data){
                            vm.results = lodash.filter(data,{departmentId:vm.lecturer.departmentId,
                                sessionId:vm.session.id,
                                semester: vm.semester.semester});
                            for(var i=0; i<vm.results.length; i++){
                                Student.getOne(vm.results[i].matricNo)
                                    .then(function(data){
                                        vm.s = data;
                                        if(vm.s.status == '0'){
                                            Result.getStudentGP(vm.s.matricNo)
                                                .then(function(data){
                                                    vm.last = lodash.findLast(data);
                                                    vm.result = lodash.filter(vm.results,{matricNo:vm.s.matricNo});
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
                                                        if(!lodash.find(vm.students,{info:{matricNo:dat.info.matricNo}})){
                                                            vm.students.push(dat);
                                                        }
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
                                                        if(!lodash.find(vm.students,{info:{matricNo:dat.info.matricNo}})){
                                                            vm.students.push(dat);
                                                        }
                                                    }
                                                });
                                        }
                                    });
                            }
                        });
                });
            vm.changeSession = function(id){
                vm.session = lodash.find(vm.sessions,{id:id});
            };
            vm.processResults = function(){
                for(var i=0; i<vm.students.length; i++){
                    Result.processResult(vm.students[i].info.matricNo,vm.students[i].tcp,vm.students[i].ctcp,vm.students[i].tnu,
                        vm.students[i].ctnu,vm.students[i].gpa,vm.students[i].cgpa,vm.students[i].prev_cgpa,vm.students[i].prev_ctcp,
                        vm.students[i].prev_ctnu,vm.students[i].prev_tce,vm.students[i].tce,vm.session.id,vm.semester.semester)
                        .then(function(data){
                            toastr.success("Result Processed");
                        })
                        .catch(function(){});
                }
                Result.getAll()
                    .then(function(data){
                        vm.results = data;
                    });
                Result.getAllGP()
                    .then(function(data){
                        vm.gps = data;
                    });
            };
            vm.releaseResults = function(){
                for(var i=0; i<vm.results.length; i++) {
                    Result.release(vm.results[i].id)
                        .then(function (data) {
                            toastr.success("Result Released");
                        });
                }
                for(var j=0; j<vm.gps.length; j++){
                    Result.releaseGP(vm.gps[j].id)
                        .then(function (data) {
                            toastr.success("Result Released");
                        });
                }
            }
        });
})();