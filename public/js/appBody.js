'use strict';

if (typeof jQuery === "undefined") {
  throw new Error("service requires jQuery");
}

var app = angular.module('dashboard');
app.controller('appBody', [
  '$scope',
  '$rootScope',
  ($scope, $rootScope) => {
    $scope.data = 'CLICK to get response from api';
    $scope.state = $rootScope.state;
    $scope.v1 = {
      reviewedName: '',
      reviewedPhone: '',
      reviewedEmail: '',
      reviewedAlternateNumber: '',
      reviewedPrimarySkills: '',
      reviewedAlternateEmail: '',
      reviewedSecontarySkills: ''
    };

    $scope.success = (data) => {
        data = JSON.parse(data);
        //data[0].options = JSON.parse(data[0].options);
        $scope.records = data;
        for (var i = 0; i < $scope.records.length; i++) {
          $scope.records[i].options = JSON.parse($scope.records[i].options);
        }
        $('header').click();
    };

    $scope.error = (error) => {
      console.log('error   ', error);
    }

    if ($scope.state === 0) {
      let headers = {
        key: 'absinth',
        access: 'onlycoc',
        'x-requested-with': 'XMLHttpRequest',
        accept: '*/*',
        'content-type': 'application/json; charset=UTF-8'
      };

      getData('/getQuestion', headers, $scope.success, $scope.error);
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

    $scope.changeState = state => {
      $scope.state = state;
    }

    $scope.showHideRadio = (id1, id2, id3, id4, id5, value) => {
      showHideRadio (id1, id2, id3, id4, id5, value);
    }

    $scope.review = () => {
      $scope.errorReviewedName = '';
      $scope.errorReviewedPhone = '';
      $scope.errorReviewedEmail = '';
      $scope.errorReviewedAlternate = '';
      $scope.errorReviewedPrimarySkills = '';
      $scope.errorReviewedAlternateEmail = '';

      let records = $scope.records;
      var qa = [];
      let isMan = [];
      let ansErrorId = [];
      let ansValid = true;
      for (let i = 0; i < records.length; i++) {
        //ans.push($('#ans'+records[i].id).val());
        let data = {
          qId: records[i].id,
          ans: $('#ans'+records[i].id).val()
        };
        qa.push(data);
        isMan.push($('#isMan'+records[i].id).val());
        ansErrorId.push('#error'+records[i].id);
        $(ansErrorId[i]).text('');
      }

      for (let i = 0; i < isMan.length; i++) {
        if (isMan[i] === '1' && (qa[i].ans === '' || qa[i].ans === undefined) ) {
          $(ansErrorId[i]).text('Required Field');
          ansValid = false;
        }
      }

      if ($scope.v1.reviewedName === '') {
        $scope.errorReviewedName = 'Required Field';
      } else if ($scope.v1.reviewedName.length < 3) {
        $scope.errorReviewedName = 'Minimum 3 leters';
      } else if (!$scope.v1.reviewedName.match(/^[A-Za-z ]+$/)) {
        $scope.errorReviewedName = 'Only Alphabets';
      } else if ($scope.v1.reviewedEmail === '') {
        $scope.errorReviewedEmail = 'Required Field';
      } else if ($scope.v1.reviewedEmail === '') {
        $scope.errorReviewedEmail = 'Required Field';
      } else if ( !validateEmail($scope.v1.reviewedEmail) ) {
        $scope.errorReviewedEmail = 'Enter Correct Email';
      } else if ( $scope.v1.reviewedAlternateEmail !== '' && !validateEmail($scope.v1.reviewedAlternateEmail) ) {
        $scope.errorReviewedAlternateEmail = 'Enter Correct Email';
      } else if ( $scope.v1.reviewedAlternateEmail === $scope.v1.reviewedEmail ) {
        $scope.errorReviewedAlternateEmail = 'Provide another Email';
      } else if ($scope.v1.reviewedPhone === '') {
        $scope.errorReviewedPhone = 'Required Field';
      } else if ($scope.v1.reviewedPhone.length < 10) {
        $scope.errorReviewedPhone = 'Enter Correct Number';
      } else if ($scope.v1.reviewedPhone.length > 10) {
        $scope.errorReviewedPhone = 'Enter Correct Number';
      } else if (!$scope.v1.reviewedPhone.match(/^[0-9]+$/)) {
        $scope.errorReviewedPhone = 'Enter Correct Number';
      } else if ( $scope.v1.reviewedAlternateNumber === $scope.v1.reviewedPhone ) {
        $scope.errorReviewedAlternate = 'Provide another Number';
      } else if ( $scope.v1.reviewedAlternateNumber !== '' && !$scope.v1.reviewedAlternateNumber.match(/^[0-9]+$/) ) {
        $scope.errorReviewedAlternate = 'Enter Correct Number';
      } else if ( $scope.v1.reviewedAlternateNumber.length < 10 ) {
        $scope.errorReviewedAlternate = 'Enter Correct Number';
      } else if ( $scope.v1.reviewedAlternateNumber.length > 10 ) {
        $scope.errorReviewedAlternate = 'Enter Correct Number';
      } else if ( $scope.v1.reviewedPrimarySkills === '' ) {
        $scope.errorReviewedPrimarySkills = 'Required Field';
      } else if (ansValid) {
        let headers = {
          key: 'absinth',
          access: 'onlycoc',
          'x-requested-with': 'XMLHttpRequest',
          accept: '*/*',
          'content-type': 'application/json; charset=UTF-8'
        };
      
        let data = {
          qa: qa,
          reviewedName: $scope.v1.reviewedName,
          reviewedEmail: $scope.v1.reviewedEmail,
          reviewedAlternateEmail: $scope.v1.reviewedAlternateEmail,
          reviewedPhone: $scope.v1.reviewedPhone,
          reviewedAlternateNumber: $scope.v1.reviewedAlternateNumber,
          reviewedPrimarySkills: $scope.v1.reviewedPrimarySkills,
          reviewedSecontarySkills: $scope.v1.reviewedSecontarySkills,
          reviewedYear: $scope.v1.reviewedYear,
          reviewedMonth: $scope.v1.reviewedMonth
        };

      //getData('/data', headers, success, error);

        postData('/review', headers, data, result => {
          console.log(result);
        }, error => {
          console.log(error);
        });
      }
    }
  }
]);
