$(document).ready(() => {
  // keep track of the divs
  var k = 0;
    // getting the data
    $.ajax({
      type: "GET",
      url: "/getSessions",
      dataType: "json",
      success: function (data) {
        // creating 2d array to store data
        var tutorSessionInfo = new Array(data.data.length);
        for (var i = 0; i < data.data.length; i++) { 
          tutorSessionInfo[i] = []; 
        }
        // storing data
        for(var i = 0; i < data.data.length; i++) {
          tutorSessionInfo[i][0] = data.data[i].tutorEmail;
          tutorSessionInfo[i][1] = data.data[i].tutorName;
          tutorSessionInfo[i][2] = data.data[i].studentEmail;
          tutorSessionInfo[i][3] = data.data[i].studentName;
          tutorSessionInfo[i][4] = data.data[i].course;
          tutorSessionInfo[i][5] = data.data[i].location;
          tutorSessionInfo[i][6] = data.data[i].date;
          tutorSessionInfo[i][7] = data.data[i].time;
        }
        // sorting tutor sessions by date
        for(var i = 0; i < tutorSessionInfo.length - 1; i++) {
          for(var j = i + 1; j < tutorSessionInfo.length; j++) {
            if(tutorSessionInfo[i][6] > tutorSessionInfo[j][6]) {
              var x = tutorSessionInfo[i];
              tutorSessionInfo[i] = tutorSessionInfo[j];
              tutorSessionInfo[j] = x;
            }
          }
        }
        // logged in user email
        var loggedInUser = data.email;
        // whole session container
        var wholeSession = document.getElementById("sessions");
        for(var i = 0; i < tutorSessionInfo.length; i++) {
          // buliding ui
          if(currentDate() <= tutorSessionInfo[i][6]) {
            if(tutorSessionInfo[i][0] == loggedInUser || tutorSessionInfo[i][2] == loggedInUser) {
            // session holder holds the whole information of one tutor session
              // create div
              var session = document.createElement('div');
              // assign id
              session.id = "session" + i;
              // append to session div
              wholeSession.appendChild(session);
              // css
              session.style.width = "100%";
              session.style.height = "130px"
              session.style.margin = "5px auto 0 auto";
              
              // tutor session
              var tutorSession = document.createElement('div');
              tutorSession.id = "tutorSession" + i;
              // append
              session.appendChild(tutorSession);
              // css
              tutorSession.style.width = "100%";
              tutorSession.style.height = "30px";
              tutorSession.style.margin = "5px auto 0 auto";

              // student session
              var studentSession = document.createElement('div');
              studentSession.id = "studentSession" + i;
              // append
              session.appendChild(studentSession);
              // css
              studentSession.style.width = "100%";
              studentSession.style.height = "30px";
              studentSession.style.margin = "5px auto 0 auto";

              //  session info
              var sessionInfo = document.createElement('div');
              sessionInfo.id = "sessionInfo" + i;
              // append
              session.appendChild(sessionInfo);
              // css
              sessionInfo.style.width = "100%";
              sessionInfo.style.height = "70px";
              sessionInfo.style.margin = "5px auto 0 auto";

              // tutor email
              var tutoremail = document.createElement('div');
              tutoremail.id = "tutoremail" + i;
              // append
              tutorSession.appendChild(tutoremail);
              // css
              tutoremail.innerHTML = "<b>TutorEmail:</b> " + tutorSessionInfo[i][0];
              tutoremail.style.width = "55%";
              tutoremail.style.height = "20px";
              tutoremail.style.cssFloat = "left"

              // tutor name
              var tutorname = document.createElement('div');
              tutorname.id = "tutorname" + i;
              // append
              tutorSession.appendChild(tutorname);
              // css
              tutorname.innerHTML = "<b>TutorName: </b>" + tutorSessionInfo[i][1];
              tutorname.style.width = "45%";
              tutorname.style.height = "20px";
              tutorname.style.cssFloat = "left"

              // student email
              var studentemail = document.createElement('div');
              studentemail.id = "studentemail" + i;
              // append
              studentSession.appendChild(studentemail);
              // css
              studentemail.innerHTML = "<b>StudentEmail:</b> " + tutorSessionInfo[i][2];
              studentemail.style.width = "55%";
              studentemail.style.height = "20px";
              studentemail.style.cssFloat = "left"

              // student name
              var studentname = document.createElement('div');
              studentname.id = "studentname" + i;
              // append
              studentSession.appendChild(studentname);
              // css
              studentname.innerHTML = "<b>StudentName:</b> " + tutorSessionInfo[i][3];
              studentname.style.width = "45%";
              studentname.style.height = "20px";
              studentname.style.cssFloat = "left"

              // course
              var course = document.createElement('div');
              course.id = "course" + i;
              // append
              sessionInfo.appendChild(course);
              // css
              course.innerHTML = "<b>Course:</b> " + tutorSessionInfo[i][4];
              course.style.width = "55%";
              course.style.height = "20px";
              course.style.cssFloat = "left"

              // location
              var location = document.createElement('div');
              location.id = "location" + i;
              // append
              sessionInfo.appendChild(location);
              // css
              location.innerHTML = "<b>Location:</b> " + tutorSessionInfo[i][5];
              location.style.width = "45%";
              location.style.height = "20px";
              location.style.cssFloat = "left"

              // date
              var date = document.createElement('div');
              date.id = "date" + i;
              // append
              sessionInfo.appendChild(date);
              // css
              date.innerHTML = "<b>Date:</b> " + tutorSessionInfo[i][6];
              date.style.width = "55%";
              date.style.height = "20px";
              date.style.cssFloat = "left"
              date.style.margin = "10px 0 0 0";

              // time
              var time = document.createElement('div');
              time.id = "time" + i;
              // append
              sessionInfo.appendChild(time);
              // css
              time.innerHTML = "<b>Time:</b> " + tutorSessionInfo[i][7];
              time.style.width = "45%";
              time.style.height = "20px";
              time.style.cssFloat = "left"
              time.style.margin = "10px 0 0 0";

              // increament id
              k++;
              // horizontal line
              wholeSession.appendChild(document.createElement('HR'));
            }
          }
        }
        if(k == 0) {
          document.getElementById("sessions").innerHTML = "You don't have any booked tutor sessions, go ahead and book one!"
        }
      }
  });
})

// getting the current date in 'yyyy/mm/dd' format
function currentDate() {
  var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}