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

