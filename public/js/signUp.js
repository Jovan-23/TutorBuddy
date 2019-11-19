
//Connecting to MongoDB
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@tutorbuddy-csxjn.azure.mongodb.net/test?retryWrites=true&w=majority";

// Creating a fucntion that vaidates the information for signing up
$(document).ready(() => {
  $("#submitUP").click(() => {
      console.log("123");
      /** Server request that saves user info to database */
      $.ajax({
        type: "post",
        url: "/csignup",
        dataType: "json",
        data: {
          username: $("#firstName").val()+" "+$("#lastName").val(),
          email:  $("#email").val(),
          password: $("#password").val()
        },
        success: function (data) {
          console.log(data);
        
          if (data.signup == "ok") {
              window.location.href = "/userProfile";
          } 
      }
      });
    });
})

