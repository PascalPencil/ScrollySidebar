function isColliding(divName) {   
  var posTop = $('#sidebar').scrollTop() - $(divName).offset().top - 1;
  if (posTop >= 0) {
    $(divName).css({
      "background-color": "yellow",
      "font-weight": "bolder"
    });
  }
}
$(document).ready(function() {
  $('.scroll-pane').scroll(function(){
    isColliding('.two');
  }).trigger('scroll');
});