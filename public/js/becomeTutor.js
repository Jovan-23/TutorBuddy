// school selection
var schoolSelection;
// subject selection
var subjectSelection;
// course selection
var courseSelection;
// count click
var clickCount1 = 0;
var clickCount2 = 0;
// when user click school drop down
function selectSchool() {
    schoolSelection = document.getElementById('school').value;
    if(schoolSelection != 'default' && clickCount1 == 0) {
        document.getElementById('form').style.height = "90px";
        document.getElementById('subject').style.visibility = "visible";
        clickCount1++;
    }
    /* if user accidentally chose default */
    if(schoolSelection == 'default') {
        document.getElementById('subject').value = 'default';
        document.getElementById('course').value = 'default';
        document.getElementById('subject').style.visibility = "hidden";
        document.getElementById('course').style.visibility = "hidden";
        document.getElementById('form').style.height = "40px";
        clickCount1 = 0;
        clickCount2 = 0;
    }
}
// when user click subject drop down
function selectSubject() {
    subjectSelection = document.getElementById('subject').value;
    if(subjectSelection != "default" && clickCount2 == 0) {
        document.getElementById('form').style.height = "150px";
        document.getElementById('course').style.visibility = "visible";
        clickCount2++;
    }
    if(subjectSelection == 'default') {
        document.getElementById('course').value = 'default';
        document.getElementById('form').style.height = "90px";
        document.getElementById('course').style.visibility = "hidden";
        clickCount2 = 0;
    }
        
}
// when user click course drop down
function selectCourse() {
    courseSelection = document.getElementById('course').value;
}