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
                    itemDiv.style.marginTop = "50px";
                    itemDiv.style.boxShadow = "0 0 30px #cccccc";
                    itemDiv.style.overflow = "hidden";
                    itemDiv.style.width = "100%";
                    itemDiv.style.paddingBottom = "15px";

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

                    //     <h5 class="card-title">School</h5>
                    var school = document.createElement('h5');
                    leftSide.appendChild(school);
                    school.innerHTML = "<b>School: </b>" + value.school;
                    school.style.padding = ".95rem 1.25rem";
                    school.style.marginBottom = "2";


                    //  <p>email </p>
                    // adding email
                    var emailInfo = document.createElement('p');
                    itemDiv.appendChild(emailInfo);
                    emailInfo.innerHTML = "<b>Email: </b>" + value.email;
                    emailInfo.style.padding = "0rem 1.25rem";
                    emailInfo.style.marginBottom = "0";
                
                    //     <p>Education: </p>
                    // adding education
                    var education = document.createElement('p');
                    itemDiv.appendChild(education);
                    education.innerHTML = "<b>Education: </b>" + value.education;
                    education.style.padding = ".75rem 1.25rem";
                    education.style.marginBottom = "0";
                    
                    //     <p>Subject: </p>
                     // adding subject
                     var subject = document.createElement('p');
                     itemDiv.appendChild(subject);
                     subject.innerHTML = "<b>Subject: </b>" + value.subject;
                     subject.style.padding = ".0rem 1.25rem";
                     subject.style.marginBottom = "0";

                    //     <p class="card-text">Course Number: </p>
                    // adding course number
                    var courseNumber = document.createElement('p');
                    itemDiv.appendChild(courseNumber);
                    courseNumber.innerHTML = "<b>Course Number: </b>" + value.courseNumber;
                    courseNumber.style.padding = ".75rem 1.25rem";
                    courseNumber.style.marginBottom = "0";

                    //     <p class="card-text">GPA: </p>
                    // adding gpa
                    var gpa = document.createElement('p');
                    itemDiv.appendChild(gpa);
                    gpa.innerHTML = "<b>GPA </b>" + value.GPA;
                    gpa.style.padding = "0rem 1.25rem";
                    gpa.style.marginBottom = "0";

                    // <div class="rightSide"> 
                    var rightSide = document.createElement('div');
                    cardBody.appendChild(rightSide);
                    rightSide.style.position = "absolute";
                    rightSide.style.bottom = "30px";
                    rightSide.style.right = "30px";

                    var acceptedButton = document.createElement("BUTTON");   
                    acceptedButton.innerHTML = "Accept";                   
                    rightSide.appendChild(acceptedButton); 
                    acceptedButton.style.width = "auto";
                    acceptedButton.style.marginRight = "5px";
                    acceptedButton.style.backgroundColor = "#28a745";
                    acceptedButton.style.color = "white";
                    acceptedButton.style.display = "inline-block";
                    acceptedButton.style.fontWeight = "400";
                    acceptedButton.style.textAlign = "center";
                    acceptedButton.style.whiteSpace = "nowrap";
                    acceptedButton.style.verticalAlign = "middle";
                    acceptedButton.style.webkitUserSelect = "none";
                    acceptedButton.style.userSelect = "none";
                    acceptedButton.style.border = "1px solid transparent";
                    acceptedButton.style.padding = ".375rem .75rem";
                    acceptedButton.style.fontSize = "1rem";
                    acceptedButton.style.lineHeight = "1.5";
                    acceptedButton.style.borderRadius = ".25rem";
                    acceptedButton.style.transition = "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out"
                    
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
                                "courseNumber": value.courseNumber},
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
                    rejectedButton.style.width = "auto";
                    rejectedButton.style.backgroundColor = "#dc3545";
                    rejectedButton.style.color = "white";
                    rejectedButton.style.display = "inline-block";
                    rejectedButton.style.fontWeight = "400";
                    rejectedButton.style.textAlign = "center";
                    rejectedButton.style.whiteSpace = "nowrap";
                    rejectedButton.style.verticalAlign = "middle";
                    rejectedButton.style.webkitUserSelect = "none";
                    rejectedButton.style.userSelect = "none";
                    rejectedButton.style.border = "1px solid transparent";
                    rejectedButton.style.padding = ".375rem .75rem";
                    rejectedButton.style.fontSize = "1rem";
                    rejectedButton.style.lineHeight = "1.5";
                    rejectedButton.style.borderRadius = ".25rem";
                    rejectedButton.style.transition = "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out";

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