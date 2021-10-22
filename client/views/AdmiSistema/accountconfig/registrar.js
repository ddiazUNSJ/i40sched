
Template.registrar.rendered = function(){

    // Add gray color for background in blank layout
   // $('body').addClass('gray-bg');
    $('body').addClass('landing-page');


}

Template.registrar.destroyed = function(){

    // Remove special color for blank layout
 //  $('body').removeClass('gray-bg');
    $('body').removeClass('landing-page');
};