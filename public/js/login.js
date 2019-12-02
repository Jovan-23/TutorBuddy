// user login username, password
$(document).ready(() => {
    /**
     * user login
     */
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
              if($("#email").val() == "tutorbuddy2019@gmail.com") {
                window.location.href = "/admin";
              } else {
                window.location.href = "/userProfile";
              }

            } else{
              alert("login fail");
              console.log(data.login);
            }
        }
        });
      });
})