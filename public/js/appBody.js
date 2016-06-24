'use strict';
var app = angular.module('dashboard');
app.controller('appBody', [
  '$scope',
  '$rootScope',
  ($scope, $rootScope) => {
    console.log('$scope', $scope);
    console.log('$rootScope', $rootScope);

    let headers = {
      key: 'absinth',
      access: 'onlycoc',
      'x-requested-with': 'XMLHttpRequest',
      accept: '*/*',
      'content-type': 'application/json; charset=UTF-8'
    };
    
    let data = {
      name: 'NIV',
      last: 'BIS'
    };

    function success (data) {
    	console.log('success   ', data);
    };

    function error (error) {
    	console.log('error   ', error);
    }

    getData('/data','GET', headers, success, error);

    var data = {'id': 111};

    postData('/data', 'POST', headers, data, success, error);
  }
]);
