// When page loads
$(document).ready(() => {
    var postedSeesionArray = "";
    var userInput = "";
    var loggedinEmail = "";
    var postID = "";

    //Read course info from the database.
    $.ajax({
        type: "get",
        url: "/getCourseInfo",
        dataType: "json",
        success: function (data) {

            //Populate drop down list for subjects and courses.
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

    //Get all posted sessions from data base.
    $.ajax({
        type: "get",
        url: "/getPostedSessions",
        dataType: "json",
        success: function (data2) {
            postedSeesionArray = data2.data;
            loggedinEmail = data2.email;
        }
    });



    //Action Listener for button "Find Tutor"
    $("#findTutor").click(() => {
        let userInput = { "school": $("#school").val(), "subject": $("#subject").val(), "course": $("#course").val() };
        $("#inputForm").hide();

        //Get current time 
        var d = new Date();
        var n = d.getTime();

        //Populate card view for selecting a posted session
        for (var i = 0; i < postedSeesionArray.length; i++) {
            var dateAndTime = postedSeesionArray[i].date.concat(" " + postedSeesionArray[i].time);
            var poDate = new Date(dateAndTime);
            var poMillisec = poDate.getTime();

            // 3 conditions checking:
            //1)If the posted time is  past time
            //2)If the tutor email is the same as logged in tutee email
            //3)If the course is the selected course.
            if (userInput.course == postedSeesionArray[i].course &&
                loggedinEmail !== postedSeesionArray[i].tutorEmail &&
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
                postID = postedSeesionArray[i]._id;

                //Populate card view html and css.
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
                    'border: 1px solid transparent; cursor : pointer; color : #f9f9f9;" id ="' + myButtonId + '">' + 'Book </button>' +
                    '</div></div>');

                //action listener for book button.
                $("#" + myButtonId + "").click(() => {
                    let index = myButtonId.substr(6);
                    let mySubject2 = postedSeesionArray[index].subject;
                    let myCourse2 = postedSeesionArray[index].course;
                    let myLocation2 = postedSeesionArray[index].location;
                    let myTime2 = postedSeesionArray[index].time;
                    let myDate2 = postedSeesionArray[index].date;
                    let myTutorEmail2 = postedSeesionArray[index].tutorEmail;
                    let myTutorName2 = postedSeesionArray[index].tutorName;
                    postID = postedSeesionArray[index]._id;


                    //Add into bookedSession table in database.
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
                        },
                        dataType: "json",
                    })

                    //Remove selected posted session from database.
                    $.ajax({
                        type: "post",
                        url: "deletePostedSessions",
                        data: {
                            "tutorEmail": myTutorEmail2,
                            "tutorName": myTutorName2,
                            "course": myCourse2,
                            "location": myLocation2,
                            "date": myDate2,
                            "time": myTime2,
                            "_id": postID
                        },
                        dataType: "json"
                    })

                    $("#result").hide();
                    $('#inputForm').show();
                    alert("Booked successfully");
                    location.reload(true);
                })
            }
        }

        //If no available tutor sessions found.
        if (!$.trim($('#result').html()).length) {
            $('#result').html('<p>Currently, there is no available tutors for your selection.</p>');

        }

        //Back button and its action listener.
        $("#backbtn").append('<button style = "width: 20%; text-align : center; background-color : #428bca;' +
            'border-radius : 15px; float : right;' +
            'border: 1px solid transparent; cursor : pointer; color : #f9f9f9;" id = "back"> Back </button>');
        $("#back").click(() => {
            $("#result").hide();
            $("#inputForm").show();
            location.reload(true);
        });
    })
});




