$(document).ready(function() {
  //On scroll in the .scroll-pane
  $('.scroll-pane').scroll(function() {
    //Get amount of sections
    var sectionAmount = $('#sidebar .section').length;
    //Calculate .section header height
    var headerHeight = $('#sidebar .section h3').outerHeight();
    //Full height of all elements if stacked on bottom, minus one
    var elementCountBottom = sectionAmount * headerHeight - headerHeight;
    //Opposite calculation of previous variable, starts at 0
    var elementCountTop = 0;
    //Each section do
    $('.section').each(function() {
      //Calculate visible .scroll-pane height
      var parentHeight = $(this).parent().outerHeight() - elementCountBottom;
      //Start top position calculation at total height of all section and integer down for every section
      var posBottom = $(this).offset().top + headerHeight;
      //Start top position calculation at 0 and integer up for every section
      var posTop = $(this).position().top;
      //If .section element touches top minus previous section headers, set position to fixed top
      if (posTop <= elementCountTop) {
        $('h3', this).addClass('snapHeader').css({
          'bottom': 'inherit',
          'top': elementCountTop + 'px'
        });
        //Add padding to sibling .body element to account for the fixing of the header's position
        $('h3', this).siblings().css('padding-top', headerHeight + 'px');
      //If .section element touches bottom minus previous section headers, set position to fixed bottom
      } else if (posBottom >= parentHeight) {
        $('h3', this).addClass('snapHeader').css({
          'top': 'inherit',
          'bottom': elementCountBottom + 'px'
        });
        //Add padding to sibling .body element to account for the fixing of the header's position
        $('h3', this).siblings().css('padding-top', headerHeight + 'px');
      //Else let section align in scroll naturally
      } else {
        $('h3', this).removeClass('snapHeader').css({
          'bottom': 'inherit',
          'top': 'inherit'
        });
        //Remove padding to sibling .body element to account for the fixing of the header's position
        $('h3', this).siblings().css('padding-top', 'inherit');
      }
      //Add +1 section header height
      elementCountTop += headerHeight;
      //Add -1 section header height
      elementCountBottom -= headerHeight;
    });
  }).trigger('scroll');
});