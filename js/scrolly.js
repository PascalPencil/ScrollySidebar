Scrolly = function(){

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
        $('.header', this).addClass('snap').css({
          'bottom': 'inherit',
          'top': (i * headerHeight + fixedTop) + 'px'
        });

        //Add padding to sibling .body element to account for the fixing of the header's position
        $('.header', this).siblings().css('padding-top', headerHeight);

      //If .section element touches bottom minus previous section headers, set position to absolute bottom
      } else if (posBottom >= parentHeight) {
        $('.header', this).addClass('snap').css({
          'top': 'inherit',
          'bottom': elementCountBottom + 'px'
        });

      //Else let section align in scroll naturally
      } else {
        $('.header', this).removeClass('snap').css({
          'bottom': 'inherit',
          'top': 'inherit'
        });

        //Remove padding to sibling .body element to account for the fixing of the header's position
        $('.header', this).siblings().css('padding-top', 'inherit');
      }

      //Add -1 section header height
      elementCountBottom -= headerHeight;
    });
  }

  //Bind scroll event so still scrollable even if under fixed divs
  $('.scroll-pane').bind('mousewheel', function(event) {
    event.preventDefault();
    var scrollTop = this.scrollTop;
    this.scrollTop = (scrollTop + ((event.deltaY * event.deltaFactor) * -1));
  });

  //Calculate .section header height
  var headerHeight = $('#sidebar .section .header').outerHeight();

  //If tick is clicked collapse section and update sidebar
  $('.section').on( "click", ".header", function() {
    $(this).closest('.section').children('.body').toggle();
    $(this).closest('.section').toggleClass('collapsed');
    Scroller();
  });

  //ScrollTo
  $('.section').on( "click", ".snap", function() {

    //Uncollapse section
    $(this).children('.body').show();
    $(this).removeClass('.collapsed');

    //Current amount of scroll
    var scrolled = $('.scroll-pane').scrollTop();

    //Get section number
    var sectionNumber = $(this).closest('.section').index();

    //Linenumber to push properly from top
    var lineNumber = sectionNumber * headerHeight;

    //Animate to div
    var topPosition = scrolled + $(this).closest('.section').position().top - lineNumber;
    $('.scroll-pane').animate({
      scrollTop: topPosition
    });

    Scroller();
  });

  //Call plugin on scroll in the .scroll-pane
  $('.scroll-pane').scroll(function() { Scroller(); }).trigger('scroll');

  //Call plugin on window resizing
  window.onresize = function() { Scroller(); };

  //Call function
  Scroller();
}

$(document).ready(function() {
  Scrolly();
});

//DOM injecting Section Seven after 5 seconds for demo purposes
setTimeout(function() {
  $('.scroll-pane').append("<div class=\"section\"><a href=\"#\" class=\"header\"><span class=\"tick\">&#9660;</span><span class=\"ticked\">&#9654;</span>  <span class=\"link\">Section 7</span></a><div class=\"body\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta ipsum a leo malesuada, sed aliquet justo eleifend. Sed vehicula pretium libero, id congue purus lobortis eget. Maecenas iaculis congue vehicula. Aliquam erat volutpat. Sed vitae facilisis nisi, nec scelerisque nulla. Maecenas a lacus euismod, tincidunt mauris at, sagittis tortor. Donec ullamcorper tortor arcu, a malesuada diam posuere id. Phasellus id ullamcorper quam.</p></div></div>");

  //Call the plugin to reload the sidebar
  Scrolly();
}, 2000);
