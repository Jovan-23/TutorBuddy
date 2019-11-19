

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
            if (value.status == "pending") {
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

                    var acceptedButton = document.createElement("BUTTON");   
                    acceptedButton.innerHTML = "Accept";                   
                    wholeSession.appendChild(acceptedButton); 
                    
                    acceptedButton.addEventListener('click', function(e) {
                        console.log(value._id);
                        console.log("Accepted button clicked")
                        $.ajax({
                            type: "post",
                            url: "/updateAdminSession",
                            data:{"id":value._id},
                            dataType: "json",
                            success: function (data) {
                            
                                
                            }
                      });
                    });
                    
                    var rejectedButton = document.createElement("BUTTON");   
                    rejectedButton.innerHTML = "Reject";                   
                    wholeSession.appendChild(rejectedButton);   

                    rejectedButton.addEventListener('click', function(e) {
                        console.log("Rejected button clicked");

                        $.ajax({
                            type: "post",
                            url: "/deleteOne",
                            data:{"id":value._id},
                            dataType: "json",
                            success: function (data) {
                                
                            }
                      });

                        
                      });
                    
                 }
                
        });
        
    }

  });
})