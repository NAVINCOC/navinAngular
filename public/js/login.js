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

  function passwordValidate(password){
    if(password.length < 6 || password.length > 15){
        return false;
    }
    else{
        return true;
    }
  }
  function confirmpassword(password,confirmpassword){
    if(password===confirmpassword){
      return true;
    }
    else{
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
    if(loginEmail==''){
      $('#errorEmail').text('Please Enter Email');
      return false;
    } else if(loginPassword==''){
      $('#errorPassword').text('Please Enter Password');
      return false;
    } else if(!validateEmail(loginEmail)){
      $('#errorEmail').text('Please Enter valid Email');
      return false;
    }
    else{
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
    $('#errorEmail').html('');
    $('#errorPassword').html('');
    $('#loginPassword').val();
    if(emailR==''){
      $('#errorEmailR').html('Please enter Email Id');
    }
    if(passwordR==''){
      $('#errorPasswordR').html('Please enter Password');
    }
     if(confirmPasswordR==''){
      $('#errorConfirmPassword').html('Please enter Confirm Password');
    } 
    if(address1==''){
      $('#errorAddress').html('Please Enter Addresss');
    }
   if(state==0){
    $('#errorState').html('Please Select State ');
   }
   if(country==0){
    $('#errorCountry').html('Please Select Country');
   }
   if(city==0){
    $('#errorCity').html('Please Select City');
   }
    if(pincode==0){
    $('#errorPincode').html('Please Select Pincode');
   }
    if(contactno==''){
    $('#errorContact').html('Please Enter Contact No.');
   }
    if(contactperson==''){
    $('#errorContactPerson').html('Please Enter Contact Person Name');
   }
   if(industryType==0){
    $('#errorIndustryType').html('Please Select Industry Type');
   }
   if(company==''){
    $('#errorCompany').html('Please Enter Company Name');
   }
   if(emailR!=''){
    if(!validateEmail(emailR)){
       $('#errorEmailR').html('Please enter Valid Email Id');
    }
   }
   if(passwordR!=='' && (!(passwordValidate(passwordR)))){
     $('#errorPasswordR').html('Password must be 8 to 16 characters long');
   }
   if(!(confirmpassword(passwordR,confirmPasswordR))){
    $('#errorConfirmPassword').html('Password not matched');
   }
   if(contactno!='' && (!allnumeric(contactno))){
    $('#errorContact').html('Must be Numeric')
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
     $('#errorContact').html('');
     $('#errorContactPerson').html('');
     $('#errorIndustryType').html('');
     $('#errorCompany').html('');
     $('#errorState').html('');
     $('#errorCountry').html('');
     $('#errorCity').html('');
     $('#errorEmailR').html('');
     $('#errorPasswordR').html('');
     $('#errorConfirmPassword').html('');
     $('#errorAddress').html('');
     $('#errorPincode').html('');
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