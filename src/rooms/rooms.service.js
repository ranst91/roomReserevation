(function () {
    'use strict';
    angular.module('app')
        .value('AVAIL_ROOMS', false)
        .service('roomsService', roomsService);

    function roomsService($http, API, AVAIL_ROOMS) {
        let service = {
            getAllRooms: getAllRooms
        };
        return service;
        //////////////////


        /**
         * @name getAllRooms
         * @desc Gets room list from the API using API endpoint constant
         * @param {String} date - "Now" | "Today" | Unix timestamp
         * @returns {Array} rooms list
         */
        function getAllRooms(date) {
            return $http({
                method: 'POST',
                url: `${API}/getrooms`,
                headers: {"Content-Type": "text/plain"},
                data: {
                    date: "now"
                }
            }).then(res => {
                AVAIL_ROOMS = res.data;
                return res.data;
            }).catch(e => {
                console.log(e);
            })
        }
    }
})();
