var main = function() {
    $('.dropdown img').click(function(){
        $('.dropdown-menu').toggle();
    });
};
 
$(document).ready(main);
        
$(document).on("click", function(event){
    var $trigger = $(".dropdown");
    if($trigger !== event.target && !$trigger.has(event.target).length){
        $(".dropdown-menu").hide();
    }            
});