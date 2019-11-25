
$(document).ready(() => {
  $.ajax({
    type: "get",
    url: "/getCourseInfo",
    dataType: "json",
    success: function (data) {
        $("#subject").html('');
        $("#course").html('');
       
        for (let index = 0; index < data.data.length; index++) {
            const element1 = data.data[index];
            $("#subject").append('<option value=' + element1.subject + '>' + element1.subject + '</option>');
            for (let index = 0; index < element1.courseNumber.length; index++) {
                const element = element1.courseNumber[index];
                $("#course").append('<option value="' + element + '">' + element + '</option>');

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




    $("#submitPost").click(() => {
        
        let data={"school":$("#school").val(),"subject":$("#subject").val(),"course":$("#course").val(),"location":$("#location").val(),"time":$("#dateTime").val()};
        console.log(123);
        /** Server request that saves user info to database */
        $.ajax({
          type: "post",
          url: "/doPost",
          dataType: "json",
          data: data,
          success: function (data) {
            console.log(data);
            if (data.post == "ok") {
                window.location.href = "/userProfile";
            } 
        }
         
        });
      });
   
})