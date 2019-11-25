

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
    if (schoolSelection != 'default' && clickCount1 == 0) {
        document.getElementById('form').style.height = "90px";
        document.getElementById('subject').style.visibility = "visible";
        clickCount1++;
    }
    /* if user accidentally chose default */
    if (schoolSelection == 'default') {
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
    if (subjectSelection != "default" && clickCount2 == 0) {
        document.getElementById('form').style.height = "150px";
        document.getElementById('course').style.visibility = "visible";
        clickCount2++;
    }
    if (subjectSelection == 'default') {
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



$(document).ready(() => {

    
    $.ajax({
        type: "get",
        url: "/getCourseInfo",
        dataType: "json",
        success: function (data) {
            $("#subject").html('');
            $("#course").html('');
           
            for (let index = 0; index < data.data.length; index++) {
                const element1 = data.data[index];
                $("#subject").append('<option value="' + element1.subject + '">' + element1.subject + '</option>');
                for (let index = 0; index < element1.courseNumber.length; index++) {
                    const element = element1.courseNumber[index];
                    $("#course").append('<option value="' + element + '">' + element + '</option>');

                }

            }




            $("#subject").change(function () {
                for (let index = 0; index < data.data.length; index++) {
                    const element1 = data.data[index];
                    if ($("#subject").val() == element1.subject) {
                        $("#course").html('');
                        for (let index = 0; index < element1.courseNumber.length; index++) {
                            const element = element1.courseNumber[index];
                            $("#course").append('<option value="' + element + '">' + element + '</option>');

                        }

                    }

                }
               
            })

        }

    });











    $("#submitApp").click(() => {
        if($("#education").val()==""||$("#school").val()==""||$("#subject").val()==""||$("#course").val()==""||$("#GPA").val()==""||$("#Rate").val()==""){
            alert("please fill out form");
            return;
        }
        let app = { "education": $("#education").val(), "school": $("#school").val(), "subject": $("#subject").val(), "courseNumber": $("#course").val(), "GPA": $("#GPA").val(), "status": "pending","Rate":$("#Rate").val() };
       
        /** Server request that saves user info to database */
        $.ajax({
            type: "post",
            url: "/tutorApp",
            dataType: "json",
            data: app,
            success: function (data) {
                console.log(data);
                if (data.apply == "ok") {
                    window.location.href = "/userProfile";
                }
            }

        });
    });

})