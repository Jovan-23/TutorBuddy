$(document).ready(() => {
    $.ajax({
      type: "get",
      url: "/getAdminSession",
      dataType: "json",
      success: function (data) {
          console.log(data);
        
        // container that will display all the json objects
        var wholeSession = document.getElementById("allcardContainer");
        $(data.data).each(function(index, value) {
            if (value.status == "accepted") {
                     console.log(value);
                    // adding email
                    var emailInfo = document.createElement('p');
                    wholeSession.append(emailInfo);
                    emailInfo.innerHTML = "<b>Email: </b>" + value.email;
                    
                    // adding tutor name 
                    var tutorName = document.createElement('p');
                    wholeSession.append(tutorName);
                    tutorName.innerHTML = "<b>Tutor Name: </b>" + value.tutorName;


                    // adding education
                    var education = document.createElement('p');
                    wholeSession.append(education);
                    education.innerHTML = "<b>Education: </b>" + value.education;

                    // adding subject
                    var subject = document.createElement('p');
                    wholeSession.append(subject);
                    subject.innerHTML = "<b>Subject: </b>" + value.subject;

                    // adding course number
                    var courseNumber = document.createElement('p');
                    wholeSession.append(courseNumber);
                    courseNumber.innerHTML = "<b>Course Number: </b>" + value.courseNumber;

                    // adding gpa
                    var gpa = document.createElement('p');
                    wholeSession.append(gpa);
                    gpa.innerHTML = "<b>GPA </b>" + value.GPA;

                    // remove button
                    var removeButton = document.createElement("BUTTON");   
                    removeButton.innerHTML = "Remove";                   
                    wholeSession.appendChild(removeButton);  
                    
                    removeButton.addEventListener('click', function(e) {
                        console.log("Remove button clicked")
                    
                      });
                }
            });
    }

  });
})