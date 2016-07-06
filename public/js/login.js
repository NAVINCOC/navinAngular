$.modal.defaults = {
  closeExisting: false,    // Close existing modals. Set this to false if you need to stack multiple modal instances.
  escapeClose: false,      // Allows the user to close the modal by pressing `ESC`
  clickClose: false,       // Allows the user to close the modal by clicking the overlay
  closeText: 'Close',     // Text content for the close <a> tag.
  closeClass: '',         // Add additional class(es) to the close <a> tag.
  showClose: false,        // Shows a (X) icon/link in the top-right corner
  modalClass: "modal",    // CSS class added to the element being displayed in the modal.
  spinnerHtml: null,      // HTML appended to the default spinner during AJAX requests.
  showSpinner: true,      // Enable/disable the default spinner during AJAX requests.
  fadeDuration: null,     // Number of milliseconds the fade transition takes (null means no transition)
  fadeDelay: 1.0          // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
};

let validEmail = false;

$(function () {
  if ($('#errorLoginPassword').text().length > 0) {
    validEmail = true;
  }
  showHideRadio('#companyType1Yes', '#companyType2No', '#companyType1No', '#companyType2Yes', '#companyType', 'COMPANY');
})

// call api for city and state

	$('#pincode').blur(function(){
			var value = $.trim($(this).val());
			let headers = {
			'x-requested-with': 'XMLHttpRequest',
			accept: '*/*',
			'content-type': 'application/json; charset=UTF-8'
			};
			getData("https://cart.paytm.com/v1/pincode/" + value, headers, data => {
			$('#city').val(data.city);
			var selectedState=$('#state').val(data.state);
			var selectedState = $(".location option:selected").val();
			
			}, error => {
			  	console.log(error.responseText);   	
			});
	});

// end api

function resetErrors () {
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

function emailValidate(email, form) {
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

function passwordValidate (password) {
  if(password.length < 6 || password.length > 15){
    return false;
  }
  else{
    return true;
  }
}

function confirmpassword (password, confirmpassword) {
  if (password === confirmpassword) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return expr.test(email);
};

function validateForgetEmail (formName)
{
	let forgetEmail;
	//let errorForgetEmail;
	forgetEmail= $("#forgetEmail").val();
	//errorForgetEmail=$("#errorForgetEmail").val();
	if(forgetEmail == "") {
		$("#errorForgetEmail").text('Please Enter Email');
		return false;
	}
	else if(forgetEmail !== "" && $("#errorForgetEmail").text().length === 0) {
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
     		$('errorForgetEmail').text("Submit again");
		  } else if (data === 'YES') {
       
         // $(errorMsgId).text('Email already registered');
        	 $('successForgetEmail').text("Login details sent on your email-id");
		  }
    }, error => {
      	console.log(error.responseText);   	
    });
	}
	else {
		return false;
	}
	console.log("asfaf");
}

function validateLogin (formId){
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

function validateRegidter () {
  $('#registerBtn').attr('disabled', true);
  resetErrors ();
    var emailR=$('#registerEmail').val();
    var registerPassword=$('#registerPassword').val();
    var confirmRegisterPassword=$('#confirmRegisterPassword').val();
    var address1=$('#address1').val();
    var address2=$('#address2').val();
    var address3=$('#address3').val();
    var country=$('#country').val();
    var state=$('#state').val();
    var city=$('#city').val();
    var pincode=$('#pincode').val();
    var contactno=$('#contactno').val();
    var contactperson=$('#contactperson').val();
    var company=$('#company').val();
    var industryType=$('#industryType').val();
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
    } else if (contactno === '') {
      $('#registerBtn').removeAttr('disabled');
      $('#errorContact').text('Please Enter Contact No.');
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
  
  function allnumeric(inputtxt){  
    var numbers = /^[-+]?[0-9]+$/;  
    if(inputtxt.match(numbers)){  
      return true;  
    }  
    else {  
      return false;  
    }  
  }  

  function resetSignUp () {
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
    $('#state').val('DELHI');
    $('#city').val('EAST DELHI');
    $('#industryType').val('1');
    $('#company').val('');
    showHideRadio('#companyType1Yes', '#companyType2No', '#companyType1No', '#companyType2Yes', '#companyType', 'COMPANY');
  }

/* function is used to show 2 icon and hide rest 2. function will also insert value in object */
function showHideRadio(show1, show2, hide1, hide2, object, value) {
  $(show1).show();
  $(show2).show();
  $(hide1).hide();
  $(hide2).hide();
  $(object).val(value);
}

function closeModal (modalId) {
  resetErrors ();
  resetSignUp ();
  $(modalId).click();
}
