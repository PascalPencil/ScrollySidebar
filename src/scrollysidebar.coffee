# Load as function to support DOM injection
scrollySidebar = ->
  # Calculate position of top of div for flexible layout
  fixedTop = $('#scrollysidebar .scroll-pane').offset().top - $(window).scrollTop()
  # Calculate .section header height
  headerHeight = $('#scrollysidebar .header').outerHeight()
  # Get amount of sections
  sectionAmount = $('#scrollysidebar .section').length
  # Full height of all elements if stacked on bottom, minus one
  elementCount = sectionAmount * headerHeight - headerHeight
  # Each section do, integer starts at 0 to calculate stacking of headers on top
  $('#scrollysidebar .section').each (i) ->
    # Calculate visible .scroll-pane height
    parentHeight = $(this).parent().outerHeight() - elementCount
    # Start top position calculation at 0 and integer up for every section
    posTop = $(this).position().top
    # Start bottom position calculation at total height of all section and integer down for every section
    posBottom = posTop + headerHeight
    # If .section element touches top minus previous section headers, set position to absolute top
    if posTop + 1 <= i * headerHeight
      $('.header', this).addClass('snap').css
        'bottom': 'inherit'
        'top': i * headerHeight + fixedTop + 'px'
      # Add padding to sibling .body element to account for the fixing of the header's position
      $('.header', this).siblings().css 'padding-top', headerHeight
      # If .section element touches bottom minus previous section headers, set position to absolute bottom
    else if posBottom >= parentHeight
      $('.header', this).addClass('snap').css
        'top': 'inherit'
        'bottom': elementCount + 'px'
      # Else let section align in scroll naturally
    else
      $('.header', this).removeClass('snap').css
        'bottom': 'inherit'
        'top': 'inherit'
      # Remove padding to sibling .body element to account for the fixing of the header's position
      $('.header', this).siblings().css 'padding-top', 'inherit'
    # Add -1 section header height
    elementCount -= headerHeight

$(document).ready ->
  # Calculate .section header height
  headerHeight = $('#scrollysidebar .section .header').outerHeight()
  # Set section's minheight so scrolling is smooth when sections are collapsed
  $('#scrollysidebar .section').css 'min-height', headerHeight
  # Header snapping
  $('#scrollysidebar .scroll-pane').on 'click', '.header', ->
    # If header isn't snapped, simply show or collapse section
    if !$(this).hasClass('snap')
      $(this).siblings().toggle()
      $(this).parent().toggleClass 'collapsed'
      # If header is snapped, clicking it will show section content and scroll section into view
    else
      # Uncollapse section
      $(this).siblings().show()
      $(this).parent().removeClass 'collapsed'
      # Current amount of scroll
      scrolled = $('#scrollysidebar .scroll-pane').scrollTop()
      # Get section number
      sectionNumber = $(this).closest('.section').index()
      # Linenumber to push properly from top
      lineNumber = sectionNumber * headerHeight
      # Animate to div
      topPosition = scrolled + $(this).closest('.section').position().top - lineNumber
      $('#scrollysidebar .scroll-pane').animate scrollTop: topPosition
    # Reset
    scrollySidebar()
  # Call functionon scroll in the .scroll-pane
  $('#scrollysidebar .scroll-pane').scroll(->
    scrollySidebar()
  ).trigger 'scroll'
  # Call function on window resizing

  window.onresize = ->
    scrollySidebar()

  # Bind scroll event so still scrollable even if under fixed divs
  $('#scrollysidebar .scroll-pane').bind 'mousewheel', (event) ->
    event.preventDefault()
    scrollTop = @scrollTop
    @scrollTop = scrollTop + event.deltaY * event.deltaFactor * -1
