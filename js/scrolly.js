Scrolly = function(){

  // Load as function to support DOM injection
  function Scroller() {

    // Calculate position of top of div for flexible layout
    var fixedTop = $('.scroll-pane').offset().top - $(window).scrollTop();

    // Set section's minheight so scroll is smooth when collapsed bodies
    $('.section').css('min-height', headerHeight);

    // Get amount of sections
    var sectionAmount = $('#sidebar .section').length;

    // Full height of all elements if stacked on bottom, minus one
    var elementCount = sectionAmount * headerHeight - headerHeight;

    // Each section do, integer starts at 0 to calculate stacking of headers on top
    $('.section').each(function(i) {

      // Calculate visible .scroll-pane height
      var parentHeight = $(this).parent().outerHeight() - elementCount;

      // Start top position calculation at 0 and integer up for every section
      var posTop = $(this).position().top;

      // Start bottom position calculation at total height of all section and integer down for every section
      var posBottom = posTop + headerHeight;

      // If .section element touches top minus previous section headers, set position to absolute top
      if (posTop <= (i * headerHeight)) {
        $('.header', this).addClass('snap').css({
          'bottom': 'inherit',
          'top': (i * headerHeight + fixedTop) + 'px'
        });

        // Add padding to sibling .body element to account for the fixing of the header's position
        $('.header', this).siblings().css('padding-top', headerHeight);

      // If .section element touches bottom minus previous section headers, set position to absolute bottom
      } else if (posBottom >= parentHeight) {
        $('.header', this).addClass('snap').css({
          'top': 'inherit',
          'bottom': elementCount + 'px'
        });

      // Else let section align in scroll naturally
      } else {
        $('.header', this).removeClass('snap').css({
          'bottom': 'inherit',
          'top': 'inherit'
        });

        // Remove padding to sibling .body element to account for the fixing of the header's position
        $('.header', this).siblings().css('padding-top', 'inherit');
      }

      // Add -1 section header height
      elementCount -= headerHeight;
    });
  }

  // Bind scroll event so still scrollable even if under fixed divs
  $('.scroll-pane').bind('mousewheel', function(event) {
    event.preventDefault();
    var scrollTop = this.scrollTop;
    this.scrollTop = (scrollTop + ((event.deltaY * event.deltaFactor) * -1));
  });

  // Calculate .section header height
  var headerHeight = $('#sidebar .section .header').outerHeight();

  // If tick is clicked collapse section and update sidebar
  $('.scroll-pane').on( "click", ".header", function() {
    if (!$(this).hasClass('snap')) {
      $(this).siblings().toggle();
      $(this).parent().toggleClass('collapsed');
    } else {
      // Uncollapse section
      $(this).siblings().show();
      $(this).parent().removeClass('collapsed');

      // Current amount of scroll
      var scrolled = $('.scroll-pane').scrollTop();

      // Get section number
      var sectionNumber = $(this).closest('.section').index();

      // Linenumber to push properly from top
      var lineNumber = sectionNumber * headerHeight;

      // Animate to div
      var topPosition = scrolled + $(this).closest('.section').position().top - lineNumber;
      $('.scroll-pane').animate({
        scrollTop: topPosition
      });
    }
    // Reset
    Scroller();
  });

  // Call plugin on scroll in the .scroll-pane
  $('.scroll-pane').scroll(function() { Scroller(); }).trigger('scroll');

  // Call plugin on window resizing
  window.onresize = function() { Scroller(); };

  // Call function
  Scroller();
}
