(function () {
    angular.module('app')
        .filter('timeStrToDateTime', function() {
            return function(time) {
                let tArr = time.split(":");
                let d = new Date(1970, 0, 1);
                d.setHours(tArr[0]);
                d.setMinutes(tArr[1]);
                return d;
            };
        })
        .directive('timeline', function () {
            return {
                restrict: 'E',
                scope: {
                    availablity: '<'
                },
                templateUrl: 'views/timeline.directive.html',
                controllerAs: 'vm',
                controller: function ($scope) {
                    let vm = this;
                    vm.availablityHours = [];
                    initCtrl();
                    compareAvailTimes();

                    ///////////////////
                    function initCtrl() {
                        let hours = [];
                        for(let i=7;i<20;i++){
                            if (i < 10)
                                hours.push(`0${i}:00`, `0${i}:15`, `0${i}:30`, `0${i}:45`);
                            else
                                hours.push(`${i}:00`, `${i}:15`, `${i}:30`, `${i}:45`);
                        }
                        return vm.hours = hours;
                    }

                    function compareAvailTimes(){
                        let availables = [];
                        $scope.availablity.forEach(time => {
                           let timeRange = time.split(' - ');
                           let low = timeRange[0];
                           let high = timeRange[1];
                           availables.push(vm.hours.filter(val => {
                                if (val >= low && val <= high)
                                    return val;
                            }));
                        });
                        vm.availablityHours = availables;
                    }
                },
                link: function ($scope, element, attrs) {
                    let tiles = document.querySelector('.timeline__step');
                    console.log(tiles);
                }
            }
        });
})();