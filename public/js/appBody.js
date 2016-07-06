'use strict';
var app = angular.module('dashboard');
app.controller('appBody', [
  '$scope',
  '$rootScope',
  ($scope, $rootScope) => {

    $scope.data = 'CLICK to get response from api';
    
    $scope.success = (data) => {
        data = JSON.parse(data);
        $scope.data = data.name + ' ' + data.last;
        console.log('success   ', $scope.data);
        $("#header").click();
    };

    $scope.error = (error) => {
      console.log('error   ', error);
    }
    
    $scope.click = () => {
      $scope.data = 'CLICK';
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

    //getData('/data', headers, success, error);

      postData('/register', headers, data, $scope.success, $scope.error);
      //console.log(result);
      //result = JSON.parse(result);
      //$scope.data = result.name + ' ' + result.last;
    }
  }
]);
