
$(document).ready(() => {
    var postedSeesionArray = "";
    var userInput = "";
    $.ajax({
      type: "get",
      url: "/getCourseInfo",
      dataType: "json",
      success: function (data) {       
          for (let index = 0; index < data.data.length; index++) {
              const element1 = data.data[index];
              $("#subject").append('<option value=' + element1.subject + '>' + element1.subject + '</option>');
              for (let index = 0; index < element1.courseNumber.length; index++) {
                  const element = element1.courseNumber[index];
                  $("#course").append('<option value=" ' + element + '">' + element + '</option>');
  
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

      $.ajax({ 
          type : "get",
          url : "/getPostedSessions",
          dataType : "json",
          success: function(data) {
              postedSeesionArray = data;
          }
      });

      $("#findTutor").click(() =>{
        let userInput = {"school":$("#school").val(),"subject":$("#subject").val(),"course":$("#course").val()};
        console.log(userInput);
        $("#inputForm").hide();
        console.log(postedSeesionArray);
        for(var i = 0; i < postedSeesionArray.data.length; i++){
            if(userInput.course == postedSeesionArray.data[i].course) {

                let myButtonId = "Button".concat(i.toString());
                let mySchool = postedSeesionArray.data[i].school;
                let mySubject = postedSeesionArray.data[i].subject;
                let myCourse = postedSeesionArray.data[i].course;
                let myLocation = postedSeesionArray.data[i].location;
                let myTime = postedSeesionArray.data[i].time;
                let myTutorEmail = postedSeesionArray.data[i].tutorEmail;
                let myTutorName = postedSeesionArray.data[i].tutorName;

                $("#result").append('<div class="myCard"> <div class="MyContainer"> <h3 id = "outputCourse">')
                $("#result").append(myCourse);
                $("#result").append('</h3>');
                $("#result").append('<p>Tutor Email: ' + myTutorEmail + '<p>');
                $("#result").append('<p>Tutor Name: ' + myTutorName + '<p>');
                $("#result").append('<p>Location: ' + myLocation + '<p>');
                $("#result").append('<p>Time: ' + myTime + '<p>');
                $("#result").append('<button id ="' + myButtonId + '">' + 'select </button>');
                $("#result").append('</div></div>'); 

                $("#"+ myButtonId + "").click(() =>{
                    let index = myButtonId.substr(6);
                    let mySubject2 = postedSeesionArray.data[index].subject;
                    let myCourse2 = postedSeesionArray.data[index].course;
                    let myLocation2 = postedSeesionArray.data[index].location;
                    let myTime2 = postedSeesionArray.data[index].time;
                    let myDate2 = postedSeesionArray.data[index].date;
                    let myTutorEmail2 = postedSeesionArray.data[index].tutorEmail;
                    let myTutorName2 = postedSeesionArray.data[index].tutorName;

                    $.ajax({
                        type : "post",
                        url : "/postBookedSessions",
                        data : {"tutorEmail" : myTutorEmail2,
                                "tutorName" : myTutorName2,
                                "course" : myCourse2,
                                "location" : myLocation2,
                                "date" : myDate2,
                                "time" : myTime2
                        },
                        dataType : "json",
                        success : console.log(("Posted"))
                    })

                    $("#result").hide();
                    $('#inputForm').show();
                    alert("Booked successfully");
                })
            }
        }
        $("#result").append('<button id = "back"> Back </button>');
        $("#back").click(() =>{
            $("#result").hide();
            $("#inputForm").show();
            location.reload(true);
        });
    })
});