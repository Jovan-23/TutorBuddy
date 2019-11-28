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
                courseNumber.innerHTML = "<b>Course Number: </b>" + value.course;
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

                // remove button
                var removeButton = document.createElement("BUTTON");   
                removeButton.innerHTML = "Remove";                   
                rightSide.appendChild(removeButton);  
                removeButton.style.width = "auto";
                removeButton.style.backgroundColor = "#dc3545";
                removeButton.style.color = "white";
                removeButton.style.display = "inline-block";
                removeButton.style.fontWeight = "400";
                removeButton.style.textAlign = "center";
                removeButton.style.whiteSpace = "nowrap";
                removeButton.style.verticalAlign = "middle";
                removeButton.style.webkitUserSelect = "none";
                removeButton.style.userSelect = "none";
                removeButton.style.border = "1px solid transparent";
                removeButton.style.padding = ".375rem .75rem";
                removeButton.style.fontSize = "1rem";
                removeButton.style.lineHeight = "1.5";
                removeButton.style.borderRadius = ".25rem";
                removeButton.style.transition = "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out";
                    
                    removeButton.addEventListener('click', function(e) {
                        console.log("Remove button clicked")
                    
                      });
                }
            });
    }

  });
})