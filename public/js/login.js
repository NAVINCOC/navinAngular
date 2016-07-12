'use strict';

//Make sure jQuery has been loaded before login.js
if (typeof jQuery === "undefined") {
  throw new Error("service requires jQuery");
}

let validEmail = false;

$( () => {
  if ($('#errorLoginPassword').text().length > 0) {
    validEmail = true;
  }
  showHideRadio('#companyType1Yes', '#companyType2No', '#companyType1No', '#companyType2Yes', '#companyType', 'COMPANY');
})

// call api for city and state

$('#pincode').blur( () => {
  let value = $.trim($('#pincode').val());
  let headers = {
    'x-requested-with': 'XMLHttpRequest',
    accept: '*/*',
    'content-type': 'application/json; charset=UTF-8'
  };
  getData("https://cart.paytm.com/v1/pincode/" + value, headers, data => {
    $('#city').val(data.city);
    let selectedState = $('#state').val(data.state);
    selectedState = $(".location option:selected").val();
  }, error => {
    console.log(error);   	
  });
});

// end api

let resetErrors = () => {
  if(validEmail === false){
  	$('#successEmail').text('');
  }
  $('#errorEmail').text('');
  $('#errorLoginPassword').text('');
  $('#errorEmailR').text('');
  $('#errorRegisterPassword').text('');
  $('#errorConfirmPassword').text('');
  $('#errorAddress').text('');
  $('#errorCountry').text('');
  $('#errorState').text('');
  $('#errorCity').text('');
  $('#errorPincode').text('');
  $('#errorContact').text('');
  $('#errorContactPerson').text('');
  $('#errorCompany').text('');
  $('#errorIndustryType').text('');
  $('#errorComapnyName').text('');
  $('#errorEmailLogin').text('');
  $('#successEmailLogin').text('');
  $('#errorForgetEmail').text('');
}

let emailValidate = (email, form) => {
  resetErrors ();
  let isEmail = $(email).val();     
  let errorMsgId;
  let successMsgId;

  if (form === 'loginForm') {
    errorMsgId = '#errorEmail';
    successMsgId = '#successEmail';
  } else if (form === 'registerForm') {
    errorMsgId = '#errorEmailR';
  } else if (form === 'modalLoginForm') {
    errorMsgId = '#errorEmailLogin';
    successMsgId = '#successEmailLogin';
  } else if (form === 'modalForgetEmail') {
    errorMsgId = '#errorForgetEmail';
    //successMsgId = '#successEmailLogin';
  }
  if(isEmail == "") {
  	$(errorMsgId).text('Please Enter Email');
  	return false;
  }
  if (isEmail !=='' && (!validateEmail(isEmail)) ) {
    $(errorMsgId).text('Please enter valid Email');
    return false;
  } else {
    $(errorMsgId).text('');
    let headers = {
      key: 'absinth',
      access: 'onlycoc',
      'x-requested-with': 'XMLHttpRequest',
      accept: '*/*',
      'content-type': 'application/json; charset=UTF-8'
    };
    
    let body = {
      email : isEmail
    };

    //getData('/data', headers, success, error);

    postData('/verifyEmail', headers, body, data => {
    	console.log("loginpage", data);
    	if (data === 'NO') {
        validEmail = false;
         console.log("login No",validEmail);
        if (form === 'loginForm' || form === 'modalLoginForm' || form === 'modalForgetEmail') {
		      $(errorMsgId).text("Please register with this email");
        } else if (form === 'registerForm') {
        }
		  } else if (data === 'YES') {
        validEmail = true;
         console.log("login yes",validEmail);
        if (form === 'loginForm' || form === 'modalLoginForm') {
			    $(successMsgId).text("Email verified");
        } else if (form === 'registerForm') {
          $(errorMsgId).text('Email already registered');
        }
		  }
    }, error => {
      	console.log(error.responseText);   	
    });
  }
}

let passwordValidate = (password) => {
  if(password.length < 6 || password.length > 15){
    return false;
  }
  else{
    return true;
  }
}

let confirmpassword = (password, confirmpassword) => {
  if (password === confirmpassword) {
    return true;
  } else {
    return false;
  }
}

let validateForgetEmail = (formName) => {
  $('#frogetBtn').attr('disabled', true);
  let forgetEmail;
  forgetEmail= $("#forgetEmail").val();
  if(forgetEmail === "") {
    $("#errorForgetEmail").text('Please Enter Email');
    $('#frogetBtn').removeAttr('disabled');
    return false;
  } else if (forgetEmail !== "" && $("#errorForgetEmail").text().length === 0) {
    let headers = {
      key: 'absinth',
      access: 'onlycoc',
      'x-requested-with': 'XMLHttpRequest',
      accept: '*/*',
      'content-type': 'application/json; charset=UTF-8'
    };
    
    let body = {
      email : forgetEmail
    };

    //getData('/data', headers, success, error);

    postData('/forgetEmail', headers, body, data => {
      console.log("check here",data);
      if (data === 'NO') {
        $('#errorForgetEmail').text("Submit again");
      } else if (data === 'YES') {
        setTimeout( () => {
          $('#forgetModalClose').click();
          $('#frogetBtn').removeAttr('disabled');
        } , 5000);
        $('#successForgetEmail').text("Login details sent on your email-id");
      }
    }, error => {
      console.log(error.responseText);
      $('#frogetBtn').removeAttr('disabled');
    });
  } else {
    $('#frogetBtn').removeAttr('disabled');
    return false;
  }
}

let validateLogin = (formId) => {
  resetErrors ();
  let loginEmail; 
  let loginPassword;  
  let errorEmail;
  let errorPassword;

  if (formId === '#loginForm') {
    $("#loginBtn").attr('disabled', true);
    loginEmail = $('#loginEmail').val();
    loginPassword = $('#loginPassword').val();
    errorEmail = '#errorEmail';
    errorPassword = '#errorLoginPassword';
  } else if (formId === '#modalLoginForm') {
    $('#modalLoginBtn').attr('disabled', true);
    loginEmail = $('#modalEmailLogin').val();
    loginPassword = $('#modelPasswordLogin').val();
    errorEmail = '#errorEmailLogin';
  }
  console.log("login form sub",validEmail);

  if (loginEmail === '') {
    $("#loginBtn").removeAttr('disabled');
    $('#modalLoginBtn').removeAttr('disabled');
    $(errorEmail).text('Please Enter Email');
    return false;
  } else if ( !validateEmail(loginEmail) ) {
    $("#loginBtn").removeAttr('disabled');
    $('#modalLoginBtn').removeAttr('disabled');
    $(errorEmail).text('Please enter valid Email');
    return false;
  } else if ( validEmail === false ) {
    $("#loginBtn").removeAttr('disabled');
    $('#modalLoginBtn').removeAttr('disabled');
     $(errorEmail).text('Please register with this email');
    return false;
  } else if (loginPassword === '') {
    $("#loginBtn").removeAttr('disabled');
    $('#modalLoginBtn').removeAttr('disabled');
    $(errorPassword).text('Please Enter Password');
    return false;
  } else {
    if (formId === '#loginForm') {
      document.forms['loginForm'].action='login';
      $('#loginForm').submit();
    } else if (formId === '#modalLoginForm') {
      document.forms['modalLoginForm'].action='login';
       $('#modalLoginForm').submit();
    }
  }
}

let validateRegidter = () => {
  $('#registerBtn').attr('disabled', true);
  resetErrors ();
    let emailR=$('#registerEmail').val();
    let registerPassword=$('#registerPassword').val();
    let confirmRegisterPassword=$('#confirmRegisterPassword').val();
    let address1=$('#address1').val();
    let address2=$('#address2').val();
    let address3=$('#address3').val();
    let country=$('#country').val();
    let state=$('#state').val();
    let city=$('#city').val();
    let pincode=$('#pincode').val();
    let contactno=$('#contactno').val();
    let contactperson=$('#contactperson').val();
    let company=$('#company').val();
    let industryType=$('#industryType').val();
    $('#loginEmail').val('');
    $('#errorEmail').text('');
    $('#errorPassword').text('');
    $('#loginPassword').val();
    console.log('pincode',pincode);
    
    if (emailR === '') {
      $('#registerBtn').removeAttr('disabled');
      $('#errorEmailR').text('Please enter Email Id');
    } else if ( !validateEmail(emailR) ) {
      $('#registerBtn').removeAttr('disabled');
      $('#errorEmailR').text('Please enter valid Email');
    } else if ( validEmail === true ) {
      $('#registerBtn').removeAttr('disabled');
      $('#errorEmailR').text('Email already registered');
    } else if (registerPassword === '') {
      $('#registerBtn').removeAttr('disabled');
      $('#errorRegisterPassword').text('Please enter Password');
    } else if ( registerPassword !== '' && (!(passwordValidate(registerPassword))) ) {
      $('#registerBtn').removeAttr('disabled');
     $('#errorRegisterPassword').text('Atleast 6 and maximum 15 characters');
    } else if (confirmRegisterPassword === '') {
      $('#registerBtn').removeAttr('disabled');
      $('#errorConfirmPassword').text('Please enter Confirm Password');
    } else if ( !(confirmpassword(registerPassword,confirmRegisterPassword)) ) {
      $('#registerBtn').removeAttr('disabled');
      $('#errorConfirmPassword').text('Password not matched');
    } else if (address1 === '') {
      $('#registerBtn').removeAttr('disabled');
      $('#errorAddress').text('Please Enter Addresss');
    } else if (state === '') {
      $('#registerBtn').removeAttr('disabled');
      $('#errorState').text('Please Select State ');
    } else if (country === '') {
      $('#registerBtn').removeAttr('disabled');
      $('#errorCountry').text('Please Select Country');
    } else if (city === '') {
      $('#registerBtn').removeAttr('disabled');
      $('#errorCity').text('Please Select City');
    } else if (pincode === '') {
      $('#registerBtn').removeAttr('disabled');
      $('#errorPincode').text('Please enter Pincode');
    } else if (pincode.length < 6) {
      $('#registerBtn').removeAttr('disabled');
      $('#errorPincode').text('Enter valid Pincode');
    } else if (pincode.length > 6) {
      $('#registerBtn').removeAttr('disabled');
      $('#errorPincode').text('Enter valid Pincode');
    } else if (!pincode.match(/^[0-9]+$/)) {
      $('#registerBtn').removeAttr('disabled');
      $('#errorPincode').text('Enter valid Pincode');
    } else if (contactno === '') {
      $('#registerBtn').removeAttr('disabled');
      $('#errorContact').text('Please Enter Contact No.');
    } else if (contactno.length < 10) {
      $('#registerBtn').removeAttr('disabled');
      $('#errorContact').text('Enter 10 digit Contact No.');
    } else if (contactno.length > 10) {
      $('#registerBtn').removeAttr('disabled');
      $('#errorContact').text('Enter 10 digit Contact No.');
    } else if (!contactno.match(/^[0-9]+$/)) {
      $('#registerBtn').removeAttr('disabled');
      $('#errorContact').text('Only Numbers');
    } else if (contactperson === '') {
      $('#registerBtn').removeAttr('disabled');
      $('#errorContactPerson').text('Please Enter Contact Person Name');
    } else if (industryType === 0) {
      $('#registerBtn').removeAttr('disabled');
      $('#errorIndustryType').text('Please Select Industry Type');
    } else if (company === '') {
      $('#registerBtn').removeAttr('disabled');
      $('#errorCompany').text('Please Enter Company Name');
    } else if( contactno !== '' && (!allnumeric(contactno)) ) {
      $('#registerBtn').removeAttr('disabled');
      $('#errorContact').text('Must be Numeric');
    } else {
      document.forms['registerForm'].action = 'register';
      $('#registerForm').submit();
    }
  }
  
let allnumeric = (inputtxt) => {  
  let numbers = /^[-+]?[0-9]+$/;  
  if(inputtxt.match(numbers)){  
    return true;  
  } else {  
    return false;  
  }  
}  

let resetSignUp = () => {
  $('#registerEmail').val('');
  $('#registerPassword').val('');
  $('#confirmRegisterPassword').val('');
  $('#contactno').val('');
  $('#contactperson').val('');
  $('#address1').val('');
  $('#address3').val('');
  $('#address2').val('');
  $('#pincode').val('');
  $('#country').val('INDIA');
  $('#state').val('');
  $('#city').val('');
  $('#industryType').val('1');
  $('#company').val('');
  showHideRadio('#companyType1Yes', '#companyType2No', '#companyType1No', '#companyType2Yes', '#companyType', 'COMPANY');
}
