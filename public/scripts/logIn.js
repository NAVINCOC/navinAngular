var logInWindow;

function logIn() {
  logInWindow = window.open("http://localhost:4000/login", "_blank", "width=900, height=300");
}

function logInConfirm() {
  logInWindow = window.open("http://localhost:4000/login", "_blank", "width=900, height=300");
  logInWindow.close();
}

function main() {
	console.log($("#input").val());
}