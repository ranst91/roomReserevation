(function () {
    'use strict';
    angular.module('app')
        .config(route);

    function route($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('main', {
                abstract: true,
                url: '/',
                template: '<div ui-view></div>',
            })
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'HomeController as vm',
            });
            // .state('room', {
            //     url: '/room/:roomId',
            //     template: '<room room="vm.room" full-page="true"></room>',
            //     controllerAs: 'vm',
            //     controller: function ($stateParams, roomsService) {
            //         let vm = this;
            //         vm.roomId = $stateParams.roomId;
            //         vm.room = roomsService.getRoom(vm.roomId);
            //     }
            // })
    }
})();
