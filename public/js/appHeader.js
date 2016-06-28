'use strict';
var app = angular.module('dashboard');
app.controller('appHeader', [
  '$scope',
  '$rootScope',
  ($scope, $rootScope) => {
  	$scope.header = 'angular is cool';
	$scope.change = function () {
		$scope.header = 'see told you its cool';
	}
  }
]);
