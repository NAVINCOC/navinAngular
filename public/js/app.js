'use strict';
var app = angular.module('dashboard', [
    'ui.router',
    'ui.sortable',
    'angular-sortable-view',
    'ngCropper',
    'autocomplete'
]);

app.run(($rootScope, $state) => {
    $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams, options) => {
        //$rootScope.currentStateName = toState.name;
        $rootScope.$broadcast('stateChanged',toState.name);
    })
});
