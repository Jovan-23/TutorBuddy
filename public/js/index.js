// Responsive Nav
$(function() {
    menu = $('nav ul');
    $('#openup').on('click', function(e) {
      e.preventDefault();
      menu.slideToggle();
    });
  
    $(window).resize(function() {
      var w = $(this).width();
      if (w > 480 && menu.is(':hidden')) {
        menu.removeAttr('style');
      }
    });
  
    $('nav li').on('click', function(e) {
      var w = $(window).width();
      if (w < 480) {
        menu.slideToggle();
      }
    });
    $('.open-menu').height($(window).height());
  });
  
// changes the become tutor image
function change1() {
  document.getElementById("changing_image").src="/img/homepage20.jpg";
}

// changes the find tutor image
function change2() {
  document.getElementById("changing_image").src="/img/homepage19.jpg";
}

// changes the view tutor image
function change3() {
  document.getElementById("changing_image").src="/img/homepage18.jpg";
}

// changes the post schedule image
function change4() {
  document.getElementById("changing_image").src="/img/homepage.jpg";
}

// changes the profile image
function change5() {
  document.getElementById("changing_image").src="/img/showcase3.jpg";
}
