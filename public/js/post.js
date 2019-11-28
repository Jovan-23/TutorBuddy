



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
            if(index==0){
                for (let index = 0; index < element1.course.length; index++) {
                    const element = element1.course[index];
                    $("#course").append('<option value="' + element + '">' + element + '</option>');
    
                }


            }
            

        }




        $("#subject").change(function () {
            for (let index = 0; index < data.data.length; index++) {
                const element1 = data.data[index];
                if ($("#subject").val() == element1.subject) {
                    $("#course").html('');
                    
                    for (let index = 0; index < element1.course.length; index++) {
                        const element = element1.course[index];
                        $("#course").append('<option value="' + element + '">' + element + '</option>');

                    }

                }

            }
           
        })

    }

});


    




    $("#submitPost").click(() => {
        

   

        if($("#school").val()==""||$("#subject").val()==""||$("#course").val()==""||$("#location").val()==""||$("#dateTime").val()==""){
            alert("please fill out form");
            return;
        }

        var dateTime=$("#dateTime").val();
        let date=new Date(dateTime);
        var day = (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate());
        var month = (date.getMonth() + 1 <= 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
        var dateString = date.getFullYear() +"-"+ month+"-"+day;
        var time= date.getHours() + ":" + date.getMinutes();
        let data={"school":$("#school").val(),"subject":$("#subject").val(),"course":$("#course").val(),"location":$("#location").val(),"date":dateString,"time":time};
        /** Server request that saves user info to database */
        $.ajax({
          type: "post",
          url: "/doPost",
          dataType: "json",
          data: data,
          success: function (data) {
           
            if (data.post == "ok") {
                window.location.href = "/userProfile";
            } else{

            }
        }
         
        });
      });
   
})