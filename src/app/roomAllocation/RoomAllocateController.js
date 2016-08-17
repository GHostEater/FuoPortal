/**
 * Created by Bello J on 6/28/2016.
 */
angular.module('fuoPortal')
    .controller("RoomAllocateController",function($modalInstance,Student,Session,Room,RoomAllocation,lodash,toastr){
        var vm  = this;
        vm.studentSelect = 0;
        vm.selectStudent = selectStudent;
        vm.deSelectStudent = deSelectStudent;
        vm.selectRoom = selectRoom;
        vm.deSelectRoom = deSelectRoom;
        Session.getAll()
            .then(function(data){
                vm.session = lodash.findLast(data);
            });
        Student.getAll()
            .then(function(data){
                vm.students = data;
            });
        Room.getAll()
            .then(function(data){
                vm.rooms = data;
            });

        function selectStudent(matricNo){
            Student.getOne(matricNo)
                .then(function(data){
                    vm.student = data;
                    vm.studentSelect = 1;
                    vm.roomSelect = 0;
                    vm.rooms = lodash.filter(vm.rooms,{sex:vm.student.sex});
                });
        }
        function deSelectStudent(){
            delete vm.student;
            vm.studentSelect = 0;
        }
        function selectRoom(id){
            Room.getOne(id)
                .then(function(data){
                    vm.room = data;
                    vm.roomSelect = 1;
                    RoomAllocation.getAll()
                        .then(function(data){
                            vm.allocations = lodash.filter(data,{roomId:vm.room.id,sessionId:vm.session.id});
                        });
                });
        }
        function deSelectRoom(){
            delete vm.room;
            vm.roomSelect = 0;
        }
        vm.ok = function(){
            RoomAllocation.allocate(vm.student.matricNo,vm.room.id,vm.session.id)
                .then(function(){
                    toastr.success("Room Allocated");
                    $modalInstance.close();
                })
                .catch(function(error){
                    if(error == 401){
                        toastr.error("Maximum Number of Students in Room Exceeded");
                    }
                    else if(error == 402){
                        toastr.error("Student Already has a Room");
                    }
                    else{
                        toastr.warning("Unable to Connect");
                    }
                });
        };
    });