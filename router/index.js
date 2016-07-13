var user = require('../public/scripts');
var error = require('./error');

module.exports = function(app) {
  app.get('/', user.index);

  app.get('/login', user.login);

  app.post('/login', user.confmLogin);

  app.post('/verifyEmail', user.verifyEmail);

  app.post('/register', user.register);

  app.post('/forgetEmail', user.forgetEmail);

  app.get('/otp', user.otp);

  app.post('/otp', user.varifyOtp);

  app.get('/resendOtp', user.resendOtp);

  app.get('/logout', user.logout);

  app.get('/getSession', user.getSession);

  app.get('/getQuestion', user.getQuestion);

  app.post('/review', user.review);

  app.get('/getReview', user.getReview);

  app.get('/error', error);
};
