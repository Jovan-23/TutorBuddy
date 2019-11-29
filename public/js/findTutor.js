
$(document).ready(() => {
    var postedSeesionArray = "";
    var userInput = "";
    var loggedinEmail = "";
    $.ajax({
        type: "get",
        url: "/getCourseInfo",
        dataType: "json",
        success: function (data) {
            for (let index = 0; index < data.data.length; index++) {
                const element1 = data.data[index];
                $("#subject").append('<option value=' + element1.subject + '>' + element1.subject + '</option>');
                for (let index = 0; index < element1.course.length; index++) {
                    const element = element1.course[index];
                }

            }
            $("#subject").change(function () {
                $("#course").html('<option value="">Select Course</option>');
                for (let index = 0; index < data.data.length; index++) {
                    const element1 = data.data[index];
                    if ($("#subject").val() == element1.subject) {
                        for (let index = 0; index < element1.course.length; index++) {
                            const element = element1.course[index];
                            $("#course").append('<option value="' + element + '">' + element + '</option>');

                        }

                    }

                }

            })

        }
    });

    $.ajax({
        type: "get",
        url: "/getPostedSessions",
        dataType: "json",
        success: function (data) {
            postedSeesionArray = data.data;
            // console.log(data.email);
            // let loggedinEmail = data.email;
        }
    });



    $("#findTutor").click(() => {
        let userInput = { "school": $("#school").val(), "subject": $("#subject").val(), "course": $("#course").val() };
        $("#inputForm").hide();
        var d = new Date();
        var n = d.getTime();
        for (var i = 0; i < postedSeesionArray.length; i++) {
            var dateAndTime = postedSeesionArray[i].date.concat(" " + postedSeesionArray[i].time);
            var poDate = new Date(dateAndTime);
            var poMillisec = poDate.getTime();
            if (userInput.course == postedSeesionArray[i].course && 
                loggedinEmail != postedSeesionArray[i].tutorEmail &&
                n < poMillisec) {

                let myButtonId = "Button".concat(i.toString());
                let mySchool = postedSeesionArray[i].school;
                let mySubject = postedSeesionArray[i].subject;
                let myCourse = postedSeesionArray[i].course;
                let myLocation = postedSeesionArray[i].location;
                let myTime = postedSeesionArray[i].time;
                let myDate = postedSeesionArray[i].date;
                let myTutorEmail = postedSeesionArray[i].tutorEmail;
                let myTutorName = postedSeesionArray[i].tutorName;
                let myRate = postedSeesionArray[i].Rate;

                $("#result").append(
                    '<div class = "cardContainer" style = "box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); transition: 0.3s; border : 2px solid transparent;   ">' +
                    '<div class = "card-body" style = "padding: 2px 16px;   ">' +
                    '<h3 style = "color : cornflowerblue; font-family: cursive">' + myCourse + '</h3>' +
                    '<p class = "card-text" >Tutor Email: ' + myTutorEmail +
                    '<p class = "card-text">Tutor Name: ' + myTutorName +
                    '<p class = "card-text">Location: ' + myLocation +
                    '<p class = "card-text">Time: ' + myTime + '</p>' +
                    '<p class = "card-text">Date: ' + myDate + '</p>' +
                    '<p class = "card-text">Rate: $' + myRate + '</p>' +
                    '<button style = "width: 30%; text-align : center; background-color : #428bca;' +
                    'border-radius : 10px;' +
                    'border: 1px solid transparent; cursor : pointer; color : #f9f9f9;" id ="' + myButtonId + '">' + 'Select </button>' +
                    '</div></div>');

                $("#" + myButtonId + "").click(() => {
                    let index = myButtonId.substr(6);
                    let mySubject2 = postedSeesionArray [index].subject;
                    let myCourse2 = postedSeesionArray [index].course;
                    let myLocation2 = postedSeesionArray [index].location;
                    let myTime2 = postedSeesionArray [index].time;
                    let myDate2 = postedSeesionArray [index].date;
                    let myTutorEmail2 = postedSeesionArray [index].tutorEmail;
                    let myTutorName2 = postedSeesionArray [index].tutorName;
                    let myRate2 = postedSeesionArray [index].Rate;

                    $.ajax({
                        type: "post",
                        url: "/postBookedSessions",
                        data: {
                            "tutorEmail": myTutorEmail2,
                            "tutorName": myTutorName2,
                            "course": myCourse2,
                            "location": myLocation2,
                            "date": myDate2,
                            "time": myTime2,
                            "Rate": myRate2
                        },
                        dataType: "json",
                    })

                    $("#result").hide();
                    $('#inputForm').show();
                    alert("Booked successfully");
                    location.reload(true);
                })
            }
        }
        if (!$.trim($('#result').html()).length) {
            $('#result').html('<p>There is currently no available tutors for your selection.</p>');

        }
        $("#result").append('<button style = "width: 30%; text-align : center; background-color : #428bca;' +
            'border-radius : 10px; float : right; margin : 10px;' +
            'border: 1px solid transparent; cursor : pointer; color : #f9f9f9;" id = "back"> Back </button>');
        $("#back").click(() => {
            $("#result").hide();
            $("#inputForm").show();
            location.reload(true);
        });
    })
});




