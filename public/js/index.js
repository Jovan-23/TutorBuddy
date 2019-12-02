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

/** Same as above but for the resposive nav bar when below 680px */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;

    if (prevScrollpos > currentScrollPos) {
        document.getElementsId("openup").style.top = "0px";
    } else {
        document.getElementsById("openup").style.top = "-300px";
    }
    prevScrollpos = currentScrollPos;
}

// changes the become tutor image
function change1() {
    document.getElementById("changing_image").src = "/img/screenshot1.PNG";
}

// changes the find tutor image
function change2() {
    document.getElementById("changing_image").src = "/img/findTutor.PNG";
}

// changes the view tutor image
function change3() {
    document.getElementById("changing_image").src = "/img/screenshot5.PNG";
}

// changes the post schedule image
function change4() {
    document.getElementById("changing_image").src = "/img/post.PNG";
}

// changes the profile image
function change5() {
    document.getElementById("changing_image").src = "/img/screenshot4.PNG";
}