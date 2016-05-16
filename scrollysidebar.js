var scrollySidebar;

scrollySidebar = function() {
  var elementCount, fixedTop, headerHeight, sectionAmount;
  fixedTop = $('#scrollysidebar .scroll-pane').offset().top - $(window).scrollTop();
  headerHeight = $('#scrollysidebar .header').outerHeight();
  sectionAmount = $('#scrollysidebar .section').length;
  elementCount = sectionAmount * headerHeight - headerHeight;
  return $('#scrollysidebar .section').each(function(i) {
    var parentHeight, posBottom, posTop;
    parentHeight = $(this).parent().outerHeight() - elementCount;
    posTop = $(this).position().top;
    posBottom = posTop + headerHeight;
    if (posTop + 1 <= i * headerHeight) {
      $('.header', this).addClass('snap').css({
        'bottom': 'inherit',
        'top': i * headerHeight + fixedTop + 'px'
      });
      $('.header', this).siblings().css('padding-top', headerHeight);
    } else if (posBottom >= parentHeight) {
      $('.header', this).addClass('snap').css({
        'top': 'inherit',
        'bottom': elementCount + 'px'
      });
    } else {
      $('.header', this).removeClass('snap').css({
        'bottom': 'inherit',
        'top': 'inherit'
      });
      $('.header', this).siblings().css('padding-top', 'inherit');
    }
    return elementCount -= headerHeight;
  });
};

$(document).ready(function() {
  if ($('#scrollysidebar').length) {
    var headerHeight;
    headerHeight = $('#scrollysidebar .section .header').outerHeight();
    $('#scrollysidebar .section').css('min-height', headerHeight);
    $('#scrollysidebar .scroll-pane').on('click', '.header', function() {
      var lineNumber, scrolled, sectionNumber, topPosition;
      if (!$(this).hasClass('snap')) {
        $(this).siblings().toggle();
        $(this).parent().toggleClass('collapsed');
      } else {
        $(this).siblings().show();
        $(this).parent().removeClass('collapsed');
        scrolled = $('#scrollysidebar .scroll-pane').scrollTop();
        sectionNumber = $(this).closest('.section').index();
        lineNumber = sectionNumber * headerHeight;
        topPosition = scrolled + $(this).closest('.section').position().top - lineNumber;
        $('#scrollysidebar .scroll-pane').animate({
          scrollTop: topPosition
        });
      }
      return scrollySidebar();
    });
    $('#scrollysidebar .scroll-pane').scroll(function() {
      return scrollySidebar();
    }).trigger('scroll');
    window.onresize = function() {
      return scrollySidebar();
    };
    return $('#scrollysidebar .scroll-pane').bind('mousewheel', function(event) {
      var scrollTop;
      event.preventDefault();
      scrollTop = this.scrollTop;
      return this.scrollTop = scrollTop + event.deltaY * event.deltaFactor * -1;
    });
  }
});
