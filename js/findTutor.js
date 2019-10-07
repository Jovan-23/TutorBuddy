/**
 * This JQuery implementation takes you to the top of the page 
 * on the button click.
 */
$("#top").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
});