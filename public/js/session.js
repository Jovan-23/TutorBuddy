$(document).ready(() => {
  // keep track of the divs
  var i = 0;
    // getting the data
    $.ajax({
      type: "GET",
      url: "/getSessions",
      dataType: "json",
      success: function (data) {
        
        // logged in user email
        var loggedInUser = data.email;
        // whole session container
        var wholeSession = document.getElementById("sessions");
        $(data.data).each(function(index, value) {
          // buliding ui
          if(value.tutorEmail == loggedInUser || value.studentEmail == loggedInUser) {
           // session holder holds the whole information of one tutor session
            // create div
            var session = document.createElement('div');
            // assign id
            session.id = "session" + i;
            // append to session div
            wholeSession.appendChild(session);
            // css
            session.style.width = "90%";
            session.style.height = "130px"
            session.style.margin = "5px auto 0 auto";
            
            // tutor session
            var tutorSession = document.createElement('div');
            tutorSession.id = "tutorSession" + i;
            // append
            session.appendChild(tutorSession);
            // css
            tutorSession.style.width = "90%";
            tutorSession.style.height = "30px";
            tutorSession.style.margin = "5px auto 0 auto";

            // student session
            var studentSession = document.createElement('div');
            studentSession.id = "studentSession" + i;
            // append
            session.appendChild(studentSession);
            // css
            studentSession.style.width = "90%";
            studentSession.style.height = "30px";
            studentSession.style.margin = "5px auto 0 auto";

            //  session info
            var sessionInfo = document.createElement('div');
            sessionInfo.id = "sessionInfo" + i;
            // append
            session.appendChild(sessionInfo);
            // css
            sessionInfo.style.width = "90%";
            sessionInfo.style.height = "70px";
            sessionInfo.style.margin = "5px auto 0 auto";

            // tutor email
            var tutoremail = document.createElement('div');
            tutoremail.id = "tutoremail" + i;
            // append
            tutorSession.appendChild(tutoremail);
            // css
            tutoremail.innerHTML = "<b>TutorEmail:</b> " + value.tutorEmail;
            tutoremail.style.width = "45%";
            tutoremail.style.height = "20px";
            tutoremail.style.cssFloat = "left"
            tutoremail.style.marginLeft = "10px";

            // tutor name
            var tutorname = document.createElement('div');
            tutorname.id = "tutorname" + i;
            // append
            tutorSession.appendChild(tutorname);
            // css
            tutorname.innerHTML = "<b>TutorName: </b>" + value.tutorName;
            tutorname.style.width = "45%";
            tutorname.style.height = "20px";
            tutorname.style.cssFloat = "left"
            tutorname.style.marginLeft = "10px";

            // student email
            var studentemail = document.createElement('div');
            studentemail.id = "studentemail" + i;
            // append
            studentSession.appendChild(studentemail);
            // css
            studentemail.innerHTML = "<b>StudentEmail:</b> " + value.studentEmail;
            studentemail.style.width = "45%";
            studentemail.style.height = "20px";
            studentemail.style.cssFloat = "left"
            studentemail.style.marginLeft = "10px";

            // student name
            var studentname = document.createElement('div');
            studentname.id = "studentname" + i;
            // append
            studentSession.appendChild(studentname);
            // css
            studentname.innerHTML = "<b>StudentName:</b> " + value.studentName;
            studentname.style.width = "45%";
            studentname.style.height = "20px";
            studentname.style.cssFloat = "left"
            studentname.style.marginLeft = "10px";

            // course
            var course = document.createElement('div');
            course.id = "course" + i;
            // append
            sessionInfo.appendChild(course);
            // css
            course.innerHTML = "<b>Course:</b> " + value.course;
            course.style.width = "45%";
            course.style.height = "20px";
            course.style.cssFloat = "left"
            course.style.marginLeft = "10px";

            // location
            var location = document.createElement('div');
            location.id = "location" + i;
            // append
            sessionInfo.appendChild(location);
            // css
            location.innerHTML = "<b>Location:</b> " + value.location;
            location.style.width = "45%";
            location.style.height = "20px";
            location.style.cssFloat = "left"
            location.style.marginLeft = "10px";

            // date
            var date = document.createElement('div');
            date.id = "date" + i;
            // append
            sessionInfo.appendChild(date);
            // css
            date.innerHTML = "<b>Date:</b> " + value.date;
            date.style.width = "45%";
            date.style.height = "20px";
            date.style.cssFloat = "left"
            date.style.margin = "10px 0 0 10px";

            // time
            var time = document.createElement('div');
            time.id = "time" + i;
            // append
            sessionInfo.appendChild(time);
            // css
            time.innerHTML = "<b>Time:</b> " + value.time;
            time.style.width = "45%";
            time.style.height = "20px";
            time.style.cssFloat = "left"
            time.style.margin = "10px 0 0 10px";

            // increament id
            i++;
            // horizontal line
            wholeSession.appendChild(document.createElement('HR'));
          }
        });
        if(i == 0) {
          document.getElementById("sessions").innerHTML = "You don't have any booked tutor sessions, go ahead and book one!"
        }
      }
  });
})