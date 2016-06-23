'use strict';
var app = angular.module('dashboard');
app.controller('appHeader', [
    '$scope',
    '$rootScope',
    ($scope, $rootScope) => {
    	$scope.header = 'angular is cool';
		console.log('$scope', $scope);
		console.log('$rootScope', $rootScope);
		$scope.change = function () {
			$scope.header = 'see told you its cool';
		}
	}
]);
