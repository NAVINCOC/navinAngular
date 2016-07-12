'use strict';

if (typeof jQuery === "undefined") {
  throw new Error("service requires jQuery");
}

var app = angular.module('dashboard');
app.controller('appHeader', [
  '$scope',
  '$rootScope',
  ($scope, $rootScope) => {
    $scope.name = 'Loading...';
    $scope.email = 'Loading...';
    let headers = {
      key: 'absinth',
      access: 'onlycoc',
      'x-requested-with': 'XMLHttpRequest',
      accept: '*/*',
      'content-type': 'application/json; charset=UTF-8'
    };

    getData ('/getSession', headers, successData => {
    	$scope.name = successData.name;
    	$scope.email = successData.email;
    	$("#header").click();
    }, error => {
    	console.log('error==== ', error);
    	$("#header").click();
    });

    $scope.change = () => {
      $scope.name = $scope.name;
    }
  }
]);
