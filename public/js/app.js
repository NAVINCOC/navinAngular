'use strict';
var app = angular.module('dashboard', [
    'ui.router',
    'ui.sortable',
    'angular-sortable-view',
    'ngCropper',
    'autocomplete'
]);

app.config(($stateProvider, $urlRouterProvider) => {

        //$urlRouterProvider.otherwise("/sess_router")

    $stateProvider
    .state('setting', {
        url: '/settings',
        templateUrl : '<p>u clicked settings</p>',
        controller  : 'controllername'
    })
    .state('userDetail', {
        url: '/user/profile',
        templateUrl : 'template/userDetail.html',
        controller  : 'userDetail'
    })
    .state('about', {
        url: '/about',
        templateUrl : 'template/about.html',
        controller  : 'aboutController'
    })
});

app.run(($rootScope, $state) => {
    $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams, options) => {
        //$rootScope.currentStateName = toState.name;
        $rootScope.$broadcast('stateChanged',toState.name);
    })
});
