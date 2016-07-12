'use strict';

//Make sure jQuery has been loaded before otp.js
if (typeof jQuery === "undefined") {
  throw new Error("service requires jQuery");
}

$( () => {
	$('#loading').hide();
})

let validateOtp = (otpId) => {
	$('#errorOtp').text('');
	$('#successOtp').text('');
  $(otpId).attr('disabled', true);
  $('#otpVerifyBtn').attr('disabled', true);
  $('#loading').show();

  if ($(otpId).val() === '') {
    $('#errorOtp').text('Required Field');
    $(otpId).removeAttr('disabled');
    $('#otpVerifyBtn').removeAttr('disabled');
    $('#loading').hide();
    return;
  }
  if ($(otpId).val().length < 6) {
    $('#errorOtp').text('Invalid OTP');
    $(otpId).removeAttr('disabled');
    $('#otpVerifyBtn').removeAttr('disabled');
    $('#loading').hide();
    return;	
  }
  if ($(otpId).val().length > 6) {
    $('#errorOtp').text('Invalid OTP');
    $(otpId).removeAttr('disabled');
    $('#otpVerifyBtn').removeAttr('disabled');
    $('#loading').hide();
    return;	
  }
  if ( !($(otpId).val().match(/^[0-9]+$/)) ) {
    $('#errorOtp').text('Invalid OTP');
    $(otpId).removeAttr('disabled');
    $('#otpVerifyBtn').removeAttr('disabled');
    $('#loading').hide();
    return;	
  }
  let headers = {
    key: 'absinth',
    access: 'onlycoc',
    'x-requested-with': 'XMLHttpRequest',
    accept: '*/*',
    'content-type': 'application/json; charset=UTF-8'
  };
    
  let body = {
    otp : $(otpId).val()
  };

  //getData('/data', headers, success, error);

  postData('/otp', headers, body, data => {
    if (data === 'YES') {
      $('#loading').hide();
      $('#successOtp').text("Email Verified Successfully");
      document.forms['otpForm'].action='/';
      $('#otpForm').submit();
    }
  }, error => {
  	$(otpId).removeAttr('disabled');
    $('#otpVerifyBtn').removeAttr('disabled');
    $('#loading').hide();
    $('#errorOtp').text(error.responseText);
    document.forms['otpForm'].action='/';
    $('#otpForm').submit();
    console.log(error.responseText);   	
  });
}

let resendOtp = () => {
  $('#errorOtp').text('');
  $('#successOtp').text('');
  $('#otp').attr('disabled', true);
  $('#otpVerifyBtn').attr('disabled', true);
  $('#loading').show();
  $('#otp').val('');
  let headers = {
    key: 'absinth',
    access: 'onlycoc',
    'x-requested-with': 'XMLHttpRequest',
    accept: '*/*',
    'content-type': 'application/json; charset=UTF-8'
  };

  //getData('/data', headers, success, error);

  getData('/resendOtp', headers, data => {
    $('#otp').removeAttr('disabled');
    $('#otpVerifyBtn').removeAttr('disabled');
    $('#loading').hide();
    $('#successOtp').text("OTP Send Successfully");
  }, error => {
  	$('#otp').removeAttr('disabled');
    $('#otpVerifyBtn').removeAttr('disabled');
    $('#loading').hide();
    $('#errorOtp').text(error.responseText);
    console.log(error.responseText);   	
  });
}
