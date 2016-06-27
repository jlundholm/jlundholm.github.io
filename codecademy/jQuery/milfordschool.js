var main = function() {
  $('img').click(function(){
    $('.dropdown-menu').toggle();
  });
};

$(document).ready(main);

var main = function () {
  $('form').submit(function(){
    var email = $('#email').val();
    var password = $('#password').val();
    
    if(email === "") {
      $('.email-error').text('Please enter your email.');
    }
    if(password === "") {
      $('.password-error').text('Please enter your password.');
    }
    return false;
  });
};
$(document).ready(main);