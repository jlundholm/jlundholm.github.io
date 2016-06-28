var main = function() {
  $('.cart').click(function(){
    $('.account .dropdown-menu').hide();
    $('.help .dropdown-menu').hide(); 
    $('.cart .dropdown-menu').toggle();
  });
  $('.account').click(function(){
    $('.cart .dropdown-menu').hide();
    $('.help .dropdown-menu').hide();
    $('.account .dropdown-menu').toggle();
  });
  $('.help').click(function(){
    $('.cart .dropdown-menu').hide();
    $('.account .dropdown-menu').hide();
    $('.help .dropdown-menu').toggle();
  });
};

$(document).ready(main);

$(document).on("click", function(event){
	var $trigger = $(".dropdown");
	if($trigger !== event.target && !$trigger.has(event.target).length){
	$(".dropdown-menu").hide();
  }            
});