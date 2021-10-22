Template.lregistrar.helpers({
  getLenguaje() {
    return T9n.getLanguage ();
  },
});
Template.lregistrar.rendered = function(){

    // Add gray color for background in blank layout
   // $('body').addClass('gray-bg');
    $('body').addClass('landing-page');


}

Template.lregistrar.destroyed = function(){

    // Remove special color for blank layout
 //  $('body').removeClass('gray-bg');
    $('body').removeClass('landing-page');
};