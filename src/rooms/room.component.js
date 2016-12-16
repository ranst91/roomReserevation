(function () {
    'use strict';
    angular.module('app')
        .component('room', {
            bindings: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                room: '<',
                onDetails: '&',
                fullPage: '@'
            },
            templateUrl: 'views/room.component.html',
            controllerAs: 'vm',
            controller: function (ModalService) {
                var vm = this;
                vm.openModal = openModal;
                vm.closeModal = closeModal;
                vm.modal = false;
                ///////////////
                function openModal(id) {
                    ModalService.Open(id);
                    vm.modal = true;
                }

                function closeModal(id) {
                    ModalService.Close(id);
                    vm.modal = false;
                }
            }
    });
})();
//Would open a popup with room info by directive
//Availability: ["07:00 - 09:30", "11:00 - 11:45", "14:30 - 18:45"]