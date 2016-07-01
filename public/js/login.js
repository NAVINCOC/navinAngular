$.modal.defaults = {
  closeExisting: false,    // Close existing modals. Set this to false if you need to stack multiple modal instances.
  escapeClose: true,      // Allows the user to close the modal by pressing `ESC`
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

$(function () {
  showHideRadio('#companyType1Yes', '#companyType2No', '#companyType1No', '#companyType2Yes', '#companyType', 'COMPANY');
})

function emailValidate() {
    $('#successEmail').text("");
  var loginEmail= $('#loginEmail').val();     
    if (loginEmail!='' && (!validateEmail(loginEmail))) {
      $('#errorEmail').text('Please Enter Valid Email');
      return false;
    }
    else{
      $('#errorEmail').text('');
      headers = {
        key: 'absinth',
        access: 'onlycoc',
        'x-requested-with': 'XMLHttpRequest',
        accept: '*/*',
        'content-type': 'application/json; charset=UTF-8'
      };
    
      data = {
        email : loginEmail
      };

    //getData('/data', headers, success, error);

      postData('/verifyEmail', headers, data, function(data) {
      	console.log("loginpage",data);
      	if(data === 'NO') {
			$('#errorEmail').text("Please register with this email");
		}
		if(data === 'YES') {
			$('#successEmail').text("Email verified");
		}
      }, function (error) {
      	console.log(error);
      	
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

  function validateLogin(){
    cancelRegister();
    var loginEmail= $('#loginEmail').val(); 
    var loginPassword= $('#loginPassword').val();  
    if (loginEmail === '') {
      $('#errorEmail').text('Please Enter Email');
      return false;
    } else if (loginPassword === '') {
      $('#errorPassword').text('Please Enter Password');
      return false;
    } else if ( !validateEmail(loginEmail) ) {
      $('#errorEmail').text('Please Enter valid Email');
      return false;
    } else {
      $('#errorEmail').text('');
      $('#errorPassword').text('');
      document.forms['loginForm'].action='login';
      $('#loginForm').submit();
    }

  }

  function validateRegidter(){
    var emailR=$('#emailR').val();
    var passwordR=$('#passwordR').val();
    var confirmPasswordR=$('#confirmPasswordR').val();
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
    
    if (emailR === '') {
      $('#errorEmailR').text('Please enter Email Id');
    } else if (emailR !== '' && !validateEmail(emailR)) {
      $('#errorEmailR').text('Please enter Valid Email Id');
    } else if (passwordR === '') {
      $('#errorPasswordR').text('Please enter Password');
    } else if ( passwordR !== '' && (!(passwordValidate(passwordR))) ) {
     $('#errorPasswordR').text('Password must be 8 to 16 characters long');
    } else if (confirmPasswordR === '') {
      $('#errorConfirmPassword').text('Please enter Confirm Password');
    } else if ( !(confirmpassword(passwordR,confirmPasswordR)) ) {
      $('#errorConfirmPassword').text('Password not matched');
    } else if (address1 === '') {
      $('#errorAddress').text('Please Enter Addresss');
    } else if (state === 0) {
      $('#errorState').text('Please Select State ');
    } else if (country === 0) {
      $('#errorCountry').text('Please Select Country');
    } else if (city === 0) {
      $('#errorCity').text('Please Select City');
    } else if (pincode === 0) {
      $('#errorPincode').text('Please Select Pincode');
    } else if (contactno === '') {
      $('#errorContact').text('Please Enter Contact No.');
    } else if (contactperson === '') {
      $('#errorContactPerson').text('Please Enter Contact Person Name');
    } else if (industryType === 0) {
      $('#errorIndustryType').text('Please Select Industry Type');
    } else if (company === '') {
      $('#errorCompany').text('Please Enter Company Name');
    } else if( contactno !== '' && (!allnumeric(contactno)) ) {
      $('#errorContact').text('Must be Numeric')
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

  function cancelRegister(){
    $('#errorContact').text('');
    $('#errorContactPerson').text('');
    $('#errorIndustryType').text('');
    $('#errorCompany').text('');
    $('#errorState').text('');
    $('#errorCountry').text('');
    $('#errorCity').text('');
    $('#errorEmailR').text('');
    $('#errorPasswordR').text('');
    $('#errorConfirmPassword').text('');
    $('#errorAddress').text('');
    $('#errorPincode').text('');
    $('#emailR').val('');
    $('#passwordR').val('');
    $('#confirmPasswordR').val('');
    $('#contactno').val('');
    $('#contactperson').val('');
    $('#address1').val('');
    $('#address3').val('');
    $('#address2').val('');
    $('#pincode').val('0');
    $('#country').val('0');
    $('#state').val('0');
    $('#city').val('0');
    $('#industryType').val('0');
    $('#company').val('');
    $("#companyRadio").prop("checked", true)
  }

/* function is used to show 2 icon and hide rest 2. function will also insert value in object */
function showHideRadio(show1, show2, hide1, hide2, object, value) {
  $(show1).show();
  $(show2).show();
  $(hide1).hide();
  $(hide2).hide();
  $(object).val(value);
}
