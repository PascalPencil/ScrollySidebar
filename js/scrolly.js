$(document).ready(function() {

  //Calculate .section header height
  var headerHeight = $('#sidebar .section h4').outerHeight();
  
  //Load as function to support DOM injection
  function Scroller() {
  
    //Calculate position of top of div for flexible layout
    var scrollTop = $(window).scrollTop();
    var elementOffset = $('.scroll-pane').offset().top;
    var fixedTop = (elementOffset - scrollTop);

    //Set section's minheight so scroll is smooth when collapsed bodies
    $('.section').css('min-height', headerHeight);
    
    //Get amount of sections
    var sectionAmount = $('#sidebar .section').length;
    
    //Full height of all elements if stacked on bottom, minus one
    var elementCountBottom = sectionAmount * headerHeight - headerHeight;
    
    //Each section do, integer starts at 0 to calculate stacking of headers on top
    $('.section').each(function(i) {
      //Calculate visible .scroll-pane height
      var parentHeight = $(this).parent().outerHeight() - elementCountBottom;
      //Start top position calculation at 0 and integer up for every section
      var posTop = $(this).position().top;
      //Start bottom position calculation at total height of all section and integer down for every section
      var posBottom = posTop + headerHeight;
      //If .section element touches top minus previous section headers, set position to absolute top
      if (posTop <= (i * headerHeight)) {
        $('h4', this).addClass('snap').css({
          'bottom': 'inherit',
          'top': (i * headerHeight + fixedTop) + 'px'
        });
        //Add padding to sibling .body element to account for the fixing of the header's position
        $('h4', this).siblings().css('padding-top', headerHeight + 'px');
        //If .section element touches bottom minus previous section headers, set position to absolute bottom
      } else if (posBottom >= parentHeight) {
        $('h4', this).addClass('snap').css({
          'top': 'inherit',
          'bottom': elementCountBottom + 'px'
        });
        //Else let section align in scroll naturally
      } else {
        $('h4', this).removeClass('snap').css({
          'bottom': 'inherit',
          'top': 'inherit'
        });
        //Remove padding to sibling .body element to account for the fixing of the header's position
        $('h4', this).siblings().css('padding-top', 'inherit');
      }
      //Add -1 section header height
      elementCountBottom -= headerHeight;
    });
  }
  
  //ScrollTo
  $('.section .title').click(function() {
    //Current amount of scroll
    var scrolled = $('.scroll-pane').scrollTop();
    //Get section number
    var sectionNumber = $(this).closest('.section').index();
    //Linenumber to push properly from top
    var lineNumber = sectionNumber * headerHeight;
    //Animate to div
    var topPosition = scrolled + $(this).closest('.section').position().top - lineNumber;
    $('.scroll-pane').animate({scrollTop: topPosition});
  });
  
  //If tick is clicked collapse section and update sidebar
  $('.section .tick').click(function(){
    $(this).closest('.section').children('.body').toggle();
    $(this).toggleClass('ticked');
    Scroller();
  });
  
  //Call plugin
  Scroller();
  
  //Call plugin on scroll in the .scroll-pane
  $('.scroll-pane').scroll(function() {
    Scroller();
  }).trigger('scroll');
  
  //Call plugin on window resizing
  window.onresize = function() {
    Scroller();
  };
  
  //DOM injecting Section Seven after 5 seconds for demo purposes
  setTimeout(function() {
    $('.scroll-pane').append("<div class=\"section seven\"><h4 class=\"title\"><a href=\"#\" class=\"label\"><div class=\"tick sprite-mid\"><i></i></div> Section 7<i class=\"status sprite-main\"></i></a></h4><div class=\"body\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta ipsum a leo malesuada, sed aliquet justo eleifend. Sed vehicula pretium libero, id congue purus lobortis eget. Maecenas iaculis congue vehicula. Aliquam erat volutpat. Sed vitae facilisis nisi, nec scelerisque nulla. Maecenas a lacus euismod, tincidunt mauris at, sagittis tortor. Donec ullamcorper tortor arcu, a malesuada diam posuere id. Phasellus id ullamcorper quam.<\/p><\/div><\/div>");
    //Call the functions to reload the sidebar
    Scroller();
  }, 2000);
});
