/**
 * Have the back-end (database for bothe current tutors and pending tutors.
 * Retrieve data from mongoDB containing infomation of users who requested
 * to become a tutor and those who are already accepted
 * 
 * Pending Tutors
 * -------------------------------------------------------------------------
 * An ajax call to grab all the users requesting to become a tutor.
 * Display the pending tutor information.
 * Button that accepts pending tutor.
 * Button that rejects pending tutor.
 * 
 * Current Tutors.
 * -------------------------------------------------------------------------
 * An ajax call to grab the current tutors in the database.
 * Display the current tutors in the system and all their information.
 * Button the remove accepted tutors.
 * 
 */

 /**
  * Current Tutors.
  * An ajax call to grab all the information for current tutors
  */
$(document).ready(() => {
    $.ajax({
      type: "get",
      url: "/getAdminSession",
      dataType: "json",
      success: function (data) {
          console.log(data);
        
        /**
         * A container (div) in the "admin.ejs" file
         * This container will contain both current and pending tutors.
         * The current tutots will be one side and the pending tutors will be on the other side
         */
        var wholeSession = document.getElementById("allCardContainerCurrent");
        $(data.data).each(function(index, value) {
            // all current tutors must have status of accpeted to be considered "current"
            if (value.status == "accepted") {
                console.log(value);

                /**
                  * A conatiner (div) in the "admin.ejs" file.
                  * This container will contain all of the current tutors.
                  * This includes personal infromation such as name, email, gpa, rate, etc.
                  */
                var itemDiv = document.createElement('div');
                wholeSession.appendChild(itemDiv);
                itemDiv.style.position = "relative";
                itemDiv.style.display = "-webkit-box";
                itemDiv.style.display= "-ms-flexbox";
                itemDiv.style.display= "flex";
                itemDiv.style.webkitBoxOrient = "vertical"
                itemDiv.style.webkitBoxDirection = "normal";
                itemDiv.style.flexDirection = "column";
                itemDiv.style.minWidth = "0";
                itemDiv.style.wordWrap = "break-word";
                itemDiv.style.backgroundColor = "#fff";
                itemDiv.style.backgroundClip = "border-box";
                itemDiv.style.border = "1px solid rgba(0,0,0,.125)";
                itemDiv.style.borderRadius = ".25rem";
                itemDiv.style.boxShadow = "0 0 30px #cccccc";
                itemDiv.style.overflow = "hidden";
                itemDiv.style.width = "100%";
                itemDiv.style.marginTop = ".5em";

                // adding tutor name 
                var tutorName = document.createElement('h5');
                itemDiv.appendChild(tutorName);
                tutorName.innerHTML = "<b>Tutor Name: </b>" + value.tutorName;
                tutorName.style.padding = ".75rem 1.25rem";
                tutorName.style.marginBottom = "0";
                tutorName.style.backgroundColor = "rgba(0,0,0,.03)";
                tutorName.style.borderBottom = "1px solid rgba(0,0,0,.125)";
                
                /**
                  * A conatiner (div) created in this file.
                  * Store the information of applicants excluding the tutor name.
                  * Implemented mainly for styling.
                  */
                var cardBody = document.createElement('div');
                itemDiv.appendChild(cardBody);
                cardBody.style.webkitBoxFlex = "1";
                cardBody.style.flex = "1 1 auto";
                cardBody.padding = "1.25rem";

                /**
                 * A conatiner (div) created in this file.
                 * Store all the information of the applicants on the left side
                 * Mainly for styling.
                 */
                var leftSide = document.createElement('div');
                cardBody.appendChild(leftSide);
                leftSide.style.cssFloat = "left";

                // school information for the applicant
                var school = document.createElement('p');
                leftSide.appendChild(school);
                school.innerHTML = "<b>School: </b>" + value.school;
                school.style.paddingLeft = "1.25rem";
                school.style.marginBottom = "2";

                // adding email
                var emailInfo = document.createElement('p');
                itemDiv.appendChild(emailInfo);
                emailInfo.innerHTML = "<b>Email: </b>" + value.email;
                emailInfo.style.paddingLeft = "1.25rem";
                emailInfo.style.marginBottom = "0";

                // adding education
                var education = document.createElement('p');
                itemDiv.appendChild(education);
                education.innerHTML = "<b>Education: </b>" + value.education;
                education.style.paddingLeft = "1.25rem";
                education.style.marginBottom = "0";
                
                 // adding subject
                 var subject = document.createElement('p');
                 itemDiv.appendChild(subject);
                 subject.innerHTML = "<b>Subject: </b>" + value.subject;
                 subject.style.paddingLeft = "1.25rem";
                 subject.style.marginBottom = "0";

                // adding course number
                var courseNumber = document.createElement('p');
                itemDiv.appendChild(courseNumber);
                courseNumber.innerHTML = "<b>Course Number: </b>" + value.course;
                courseNumber.style.paddingLeft = "1.25rem";
                courseNumber.style.marginBottom = "0";

                // adding gpa
                var gpa = document.createElement('p');
                itemDiv.appendChild(gpa);
                gpa.innerHTML = "<b>GPA </b>" + value.GPA;
                gpa.style.paddingLeft = "1.25rem";
                gpa.style.marginBottom = "0";

                // adding rate
                var courseNumber = document.createElement('p');
                itemDiv.appendChild(courseNumber);
                courseNumber.innerHTML = "<b>Rate: $</b>" + value.Rate;
                courseNumber.style.paddingLeft = "1.25rem";
                courseNumber.style.marginBottom = "0";

                /**
                 * A conatiner (div) created in this file.
                 * Store all the buttons on the right side 
                 * Mainly for styling.
                 */ 
                var rightSide = document.createElement('div');
                cardBody.appendChild(rightSide);
                rightSide.style.position = "absolute";
                rightSide.style.bottom = "13px";
                rightSide.style.right = "20px";

                // remove button
                var removeButton = document.createElement("BUTTON");   
                removeButton.innerHTML = "Remove";                   
                rightSide.appendChild(removeButton);  
                removeButton.style.width = "90px";
                removeButton.style.backgroundColor = "transparent";
                removeButton.style.color = "#dc3545";
                removeButton.style.display = "inline-block";
                removeButton.style.fontWeight = "650";
                removeButton.style.textAlign = "center";
                removeButton.style.whiteSpace = "nowrap";
                removeButton.style.verticalAlign = "middle";
                removeButton.style.webkitUserSelect = "none";
                removeButton.style.userSelect = "none";
                removeButton.style.border = "1px solid #dc3545";
                removeButton.style.padding = ".375rem .75rem";
                removeButton.style.fontSize = "1rem";
                removeButton.style.lineHeight = "1.5";
                removeButton.style.borderRadius = ".25rem";
                removeButton.style.cursor = "pointer";
                removeButton.style.transition = "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out";                
                removeButton.style.textTransform = "uppercase";    

                removeButton.addEventListener('click', function(e) {
                  console.log("Rejected button clicked");

                  $.ajax({
                      type: "post",
                      url: "/deleteTutor",
                      data:{"id":value._id,
                          "name" : value.tutorName,
                          "email" : value.email,
                          "school": value.school,
                          "subject": value.subject,
                          "courseNumber": value.courseNumber},
                      dataType: "json",
                      success: function (data) {
                        if(data.delete=="ok"){
                          parent.location.reload(); 
                   
                        }
                      }
                });

                  
                });
                }
            });
    }

  });
})

/**
  * Pending Tutors
  * An ajax call to grab all the information for current tutors
  */
$(document).ready(() => {
  $.ajax({
    type: "get",
    url: "/getAdminSession",
    dataType: "json",
    success: function (data) {
        console.log(data);
      
      // container that will display all the json objects
      var wholeSession = document.getElementById("allCardContainerPendings");
      $(data.data).each(function(index, value) {
          if (value.status == "pending") {
                   console.log(value);
                  // adding email

                  var itemDiv = document.createElement('div');
                  wholeSession.appendChild(itemDiv);
                  itemDiv.style.position = "relative";
                  itemDiv.style.display = "-webkit-box";
                  itemDiv.style.display= "-ms-flexbox";
                  itemDiv.style.display= "flex";
                  itemDiv.style.webkitBoxOrient = "vertical"
                  itemDiv.style.webkitBoxDirection = "normal";
                  itemDiv.style.flexDirection = "column";
                  itemDiv.style.minWidth = "0";
                  itemDiv.style.wordWrap = "break-word";
                  itemDiv.style.backgroundColor = "#fff";
                  itemDiv.style.backgroundClip = "border-box";
                  itemDiv.style.border = "1px solid rgba(0,0,0,.125)";
                  itemDiv.style.borderRadius = ".25rem";
                  itemDiv.style.boxShadow = "0 0 30px #cccccc";
                  itemDiv.style.overflow = "hidden";
                  itemDiv.style.width = "100%";
                  itemDiv.style.marginTop = ".5em";

                  //<h5 class="card-header"><b>TutorName</b></h5>
                  // adding tutor name 
                  var tutorName = document.createElement('h5');
                  itemDiv.appendChild(tutorName);
                  tutorName.innerHTML = "<b>Tutor Name: </b>" + value.tutorName;
                  tutorName.style.padding = ".75rem 1.25rem";
                  tutorName.style.marginBottom = "0";
                  tutorName.style.backgroundColor = "rgba(0,0,0,.03)";
                  tutorName.style.borderBottom = "1px solid rgba(0,0,0,.125)";
                  
                  //<div class="card-body"></div>
                  var cardBody = document.createElement('div');
                  itemDiv.appendChild(cardBody);
                  cardBody.style.webkitBoxFlex = "1";
                  cardBody.style.flex = "1 1 auto";
                  cardBody.padding = "1.25rem";

                  // <div class="leftSide"> 
                  var leftSide = document.createElement('div');
                  cardBody.appendChild(leftSide);
                  leftSide.style.cssFloat = "left";

                  // school information
                  var school = document.createElement('p');
                  leftSide.appendChild(school);
                  school.innerHTML = "<b>School: </b>" + value.school;
                  school.style.paddingLeft = "1.25rem";
                  school.style.marginBottom = "2";

                  // adding email
                  var emailInfo = document.createElement('p');
                  itemDiv.appendChild(emailInfo);
                  emailInfo.innerHTML = "<b>Email: </b>" + value.email;
                  emailInfo.style.paddingLeft = "1.25rem";
                  emailInfo.style.marginBottom = "0";
              
                  // adding education
                  var education = document.createElement('p');
                  itemDiv.appendChild(education);
                  education.innerHTML = "<b>Education: </b>" + value.education;
                  education.style.paddingLeft = "1.25rem";
                  education.style.marginBottom = "0";
                  
                   // adding subject
                   var subject = document.createElement('p');
                   itemDiv.appendChild(subject);
                   subject.innerHTML = "<b>Subject: </b>" + value.subject;
                   subject.style.paddingLeft = "1.25rem";
                   subject.style.marginBottom = "0";

                  // adding course number
                  var courseNumber = document.createElement('p');
                  itemDiv.appendChild(courseNumber);
                  courseNumber.innerHTML = "<b>Course Number: </b>" + value.course;
                  courseNumber.style.paddingLeft = "1.25rem";
                  courseNumber.style.marginBottom = "0";

                  // adding gpa
                  var gpa = document.createElement('p');
                  itemDiv.appendChild(gpa);
                  gpa.innerHTML = "<b>GPA </b>" + value.GPA;
                  gpa.style.paddingLeft = "1.25rem";
                  gpa.style.marginBottom = "0";

                  // adding rate
                  var courseNumber = document.createElement('p');
                  itemDiv.appendChild(courseNumber);
                  courseNumber.innerHTML = "<b>Rate: $</b>" + value.Rate;
                  courseNumber.style.paddingLeft = "1.25rem";
                  courseNumber.style.marginBottom = "0";

                  // <div class="rightSide"> 
                  var rightSide = document.createElement('div');
                  cardBody.appendChild(rightSide);
                  rightSide.style.position = "absolute";
                  rightSide.style.bottom = "13px";
                  rightSide.style.right = "20px";

                  var acceptedButton = document.createElement("BUTTON");   
                  acceptedButton.innerHTML = "Accept";                   
                  rightSide.appendChild(acceptedButton); 
                  acceptedButton.style.width = "90px";
                  acceptedButton.style.marginRight = "5px";
                  acceptedButton.style.backgroundColor = "transparent";
                  acceptedButton.style.color = "#28a745";
                  acceptedButton.style.display = "inline-block";
                  acceptedButton.style.fontWeight = "650";
                  acceptedButton.style.textAlign = "center";
                  acceptedButton.style.whiteSpace = "nowrap";
                  acceptedButton.style.verticalAlign = "middle";
                  acceptedButton.style.webkitUserSelect = "none";
                  acceptedButton.style.userSelect = "none";
                  acceptedButton.style.border = "1px solid #28a745";
                  acceptedButton.style.padding = ".375rem .75rem";
                  acceptedButton.style.fontSize = "1rem";
                  acceptedButton.style.cursor = "pointer";
                  acceptedButton.style.lineHeight = "1.5";
                  acceptedButton.style.borderRadius = ".25rem";
                  acceptedButton.style.transition = "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out"
                  acceptedButton.style.textTransform = "uppercase";    


                  acceptedButton.addEventListener('click', function(e) {
                      console.log(value._id);
                      console.log("Accepted button clicked")
                      $.ajax({
                          type: "post",
                          url: "/updateAdminSession",
                          data:{"id":value._id,
                              "name" : value.tutorName,
                              "email" : value.email,
                              "school": value.school,
                              "subject": value.subject,
                              "course": value.course},
                          dataType: "json",
                          success: function (data) {
                            if(data.update=="ok"){
                              value.status="accepted";
                              parent.location.reload(); 
                            }
                              
                          }
                    });
                  });
                  
                  var rejectedButton = document.createElement("BUTTON");   
                  rejectedButton.innerHTML = "Reject";                   
                  rightSide.appendChild(rejectedButton);   
                  rejectedButton.style.width = "90px";
                  rejectedButton.style.backgroundColor = "transparent";
                  rejectedButton.style.color = "#dc3545";
                  rejectedButton.style.display = "inline-block";
                  rejectedButton.style.fontWeight = "650";
                  rejectedButton.style.textAlign = "center";
                  rejectedButton.style.whiteSpace = "nowrap";
                  rejectedButton.style.verticalAlign = "middle";
                  rejectedButton.style.webkitUserSelect = "none";
                  rejectedButton.style.userSelect = "none";                
                  rejectedButton.style.cursor = "pointer";
                  rejectedButton.style.border = "1px solid #dc3545";
                  rejectedButton.style.padding = ".375rem .75rem";
                  rejectedButton.style.fontSize = "1rem";
                  rejectedButton.style.lineHeight = "1.5";
                  rejectedButton.style.borderRadius = ".25rem";
                  rejectedButton.style.transition = "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out";
                  rejectedButton.style.textTransform = "uppercase";

                  rejectedButton.addEventListener('click', function(e) {
                      console.log("Rejected button clicked");

                      $.ajax({
                          type: "post",
                          url: "/deleteTutor",
                          data:{"id":value._id,
                              "name" : value.tutorName,
                              "email" : value.email,
                              "school": value.school,
                              "subject": value.subject,
                              "course": value.course},
                          dataType: "json",
                          success: function (data) {
                            if(data.delete=="ok"){
                              parent.location.reload(); 
                       
                            }
                          }
                    });

                      
                    });
                  
               }
              
      });   
  }
});
});