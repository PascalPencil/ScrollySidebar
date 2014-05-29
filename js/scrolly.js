$(document).ready(function() {
  
  function Clicker() {
    //Calculate .section header height
    var headerHeight = $('#sidebar .section h3').outerHeight();
    
    //Get amount of sections
    var sectionAmount = $('#sidebar .section').length;
    
    //Smooth scrolling to section
    $('.section').each(function(i) {
      //Get element position relative to top of sidebar, minus previous sections' headers heights
      var pos = $(this).position().top - (i * headerHeight);
      //Onclick scroll to specified height
      $('h3', this).click(function() {
        //Animate to div
        $('.scroll-pane').animate({
          scrollTop: pos
        }, 600);
      });
      /* $('h3', this).html(pos); */
    });
  }
  
  //Call plugin 1
  Clicker();
  
  //Load as function to support DOM injection
  function Scroller() {
  
    //Calculate .section header height
    var headerHeight = $('#sidebar .section h3').outerHeight();
    
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
        $('h3', this).addClass('snap').css({
          'bottom': 'inherit',
          'top': (i * headerHeight) + 'px'
        });
        //Add padding to sibling .body element to account for the fixing of the header's position
        $('h3', this).siblings().css('padding-top', headerHeight + 'px');
        //If .section element touches bottom minus previous section headers, set position to absolute bottom
      } else if (posBottom >= parentHeight) {
        $('h3', this).addClass('snap').css({
          'top': 'inherit',
          'bottom': elementCountBottom + 'px'
        });
        //Else let section align in scroll naturally
      } else {
        $('h3', this).removeClass('snap').css({
          'bottom': 'inherit',
          'top': 'inherit'
        });
        //Remove padding to sibling .body element to account for the fixing of the header's position
        $('h3', this).siblings().css('padding-top', 'inherit');
      }
      //Add -1 section header height
      elementCountBottom -= headerHeight;
    });
  }
  
  //Call plugin 2
  Scroller();
  
  //Call plugin on scroll in the .scroll-pane
  $('.scroll-pane').scroll(function() {
    Scroller();
  }).trigger('scroll');
  
  //Call plugin on window resizing
  window.onresize = function(event) {
    Scroller();
  };
  
  //DOM injecting Section Seven after 5 seconds for demo purposes
  /*
setTimeout(function() {
    $('.scroll-pane').append("<div class=\"section seven\"><h3>Section 7<\/h3><div class=\"body\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta ipsum a leo malesuada, sed aliquet justo eleifend. Sed vehicula pretium libero, id congue purus lobortis eget. Maecenas iaculis congue vehicula. Aliquam erat volutpat. Sed vitae facilisis nisi, nec scelerisque nulla. Maecenas a lacus euismod, tincidunt mauris at, sagittis tortor. Donec ullamcorper tortor arcu, a malesuada diam posuere id. Phasellus id ullamcorper quam.<\/p><\/div><\/div>");
    //Call the functions to reload the sidebar
    Clicker();
    Scroller();
  }, 2000);
*/
});
