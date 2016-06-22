var main = function() {
  $('#image-url').keyup(function() {
    var url = $(this).val();
    $('.thumbnail img').attr('src', 'url');
  });
  
  $('#top-text').keyup(function(){
  	var top = $(this).val();
    $('.top-caption').text(top);
  });
  
  $('#bottom-text').keyup(function(){
    $(this).val();
    $('.bottom-caption').text($(this).val());
  });
};
 
$(document).ready(main);

/*
	$('#bottom-text').keyup(function(){
    var bottom = $(this).val();
    $('.bottom-caption').text(bottom);
  });
*/