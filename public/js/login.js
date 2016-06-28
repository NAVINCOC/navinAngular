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
     var loginEmail= $('#loginEmail').val();     
       if (loginEmail!='' && (!ValidateEmail(loginEmail))) {
            $('#errorEmail').html('Please Enter Valid Email');
            return false;
        }
        else{
          $('#errorEmail').html('');
        }
        $.ajax({
          url: "",
          success: function(result){
           
          },
           error: function (error) {
                   $('#errorEmail').html(error);
           }
        });

  };

 function passwordValidate(){
     var loginPassword= $('#loginPassword').val();  
     if(loginPassword !=''){
       if(loginPassword.length < 6 || loginPassword.length > 15){
         $('#errorPassword').html('Password must be 6 to 15 characters long');
         return false;
       }
       else{
        return true;
       }
     } 
    
       
 }
 function ValidateEmail(email) {
        var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return expr.test(email);
  };

  function validateLogin(){
    var loginEmail= $('#loginEmail').val(); 
    var loginPassword= $('#loginPassword').val();  
    if(loginEmail==''){
      $('#errorEmail').html('Please Enter valid Email');
      return false;
    }  
    if(loginPassword==''){
      $('#errorPassword').html('Please Enter Password');
      return false;
    }    
    if()

  }
