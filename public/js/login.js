


$(document).ready(() => {
 
    $("#submitIN").click(() => {
    
        /** Server request that saves user info to database */
        $.ajax({
          type: "post",
          url: "/clogin",
          dataType: "json",
          data: {
            email: $("#email").val(),
            password: $("#password").val(),
          },
          success: function (data) {
            console.log(data);
            if (data.login == "ok") {
                window.location.href = "/becomeTutor";
            } 
        }
         
        });
      });
   
})