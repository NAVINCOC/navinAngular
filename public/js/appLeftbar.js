'use strict';
var app = angular.module('dashboard');
app.controller('appLeftbar', [
    '$scope',
    '$rootScope',
    ($scope, $rootScope) => {
		console.log('$scope', $scope);
		console.log('$rootScope', $rootScope);
	}
]);
