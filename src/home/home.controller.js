(function () {
    'use strict';
    angular.module('app')
        .controller('HomeController', HomeController);

    function HomeController($state, roomsService) {
        let vm = this;
        vm.rooms = [];

        getAllRooms();
        ////////////

        /**
         * Get markers from the charge points API (chargepoints.json)
         */
        function getAllRooms(){
            roomsService.getAllRooms("now").then(rooms => {
                vm.rooms = rooms;
            });
        }

        vm.roomDetails = function(roomObj){
            $state.go('room', {roomId: roomObj.name});
        }
    }
})();
