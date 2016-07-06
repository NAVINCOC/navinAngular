/*all the ajax/ api calls will be here*/
//Make sure jQuery has been loaded before service.js
if (typeof jQuery === "undefined") {
  throw new Error("service requires jQuery");
}

let getData = (url, headers, cbSuccess, cbError) => {
  $.ajax({
    url: url,
    type: 'GET',
    header: headers,
    success: cbSuccess,
    error: cbError
  });
}

let postData = (url, headers, data, cbSuccess, cbError) => {
  $.ajax({
    url: url,
    type: 'POST',
    header: headers,
    data: data,
    success: cbSuccess,
    error: cbError
  });
}

/*
  first file can call 2nd file function(), only after 2nd file is loaded and not before that
example:
display(123); this will give error 'display is not defined'
setTimeout(function() {display(123);}); this will work perfectly fine

display is defined in some other js file loaded after this file.
*/
