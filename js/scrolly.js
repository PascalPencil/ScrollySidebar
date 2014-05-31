// Load as function to support DOM injection
function Scrolly() {

  // Calculate position of top of div for flexible layout
  var fixedTop = $('.scroll-pane').offset().top - $(window).scrollTop();

  // Calculate .section header height
  var headerHeight = $('#sidebar .section .header').outerHeight();

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

$(document).ready(function() {

  // Calculate position of top of div for flexible layout
  var fixedTop = $('.scroll-pane').offset().top - $(window).scrollTop();

  // Calculate .section header height
  var headerHeight = $('#sidebar .section .header').outerHeight();

  // Set section's minheight so scrolling is smooth when sections are collapsed
  $('.section').css('min-height', headerHeight);

  // Header snapping
  $('.scroll-pane').on("click", ".header", function() {

    // If header isn't snapped, simply show or collapse section
    if (!$(this).hasClass('snap')) {
      $(this).siblings().toggle();
      $(this).parent().toggleClass('collapsed');

    // If header is snapped, clicking it will show section content and scroll section into view
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
    Scrolly();
  });

  // Call functionon scroll in the .scroll-pane
  $('.scroll-pane').scroll(function() {
    Scrolly();
  }).trigger('scroll');

  // Call function on window resizing
  window.onresize = function() {
    Scrolly();
  };

  // Bind scroll event so still scrollable even if under fixed divs
  $('.scroll-pane').bind('mousewheel', function(event) {
    event.preventDefault();
    var scrollTop = this.scrollTop;
    this.scrollTop = (scrollTop + ((event.deltaY * event.deltaFactor) * -1));
  });
});
