'use strict';

if (typeof jQuery === "undefined") {
  throw new Error("service requires jQuery");
}

var app = angular.module('dashboard');
app.controller('appLeftbar', [
  '$scope',
  '$rootScope',
  ($scope, $rootScope) => {
    $scope.changeState = state => {
      console.log('$rootScope  appLeftbar   ', $rootScope)
      $rootScope.state = state;
      $("#header").click();
    }
  }
]);
