


$(document).ready(() => {
  
    /**
     * get approval course info
     */
  $.ajax({
    type: "get",
    url: "/getApprCourseInfo",
    dataType: "json",
    success: function (data1) {
        console.log(data1);
        console.log(data1.data.length);
        let data;
        
        if(data1.data=="none"){
            let data2={"subject":"","course":""};
            data={"data":[data2]};
           
        }else if(data1.data.length==1){
            console.log(data1);
         
              let data2={"subject":data1.data[0].subject,"course":[data1.data[0].course]};
            
             data={"data":[data2]};
        }else if(data1.data.length==2){
            let data2={"subject":data1.data[0].subject,"course":[data1.data[0].course]};
            let data3={"subject":data1.data[1].subject,"course":[data1.data[1].course]};
            
            data={"data":[data2,data3]};
        }else if(data1.data.length==3){
            let data2={"subject":data1.data[0].subject,"course":[data1.data[0].course]};
            let data3={"subject":data1.data[1].subject,"course":[data1.data[1].course]};
            let data4={"subject":data1.data[2].subject,"course":[data1.data[2].course]};
            
            data={"data":[data2,data3,data4]};
        }
      
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

        /**
         * set subject dropdown listener
         */
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


    



    /**
     * tutor post session
     */
    $("#submitPost").click(() => {
        if($("#school").val()==""||$("#subject").val()==""||$("#course").val()==""||$("#location").val()==""||$("#dateTime").val()==""){
            alert("please fill out form");
            return;
        }

        var dateTime=$("#dateTime").val();
        let date=new Date(dateTime);
        let now=new Date();
        if(date<now){
            alert("please enter a day after current day");
            return;
        }
       
      
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
            } else if (data.post=="application pending"){
                alert("application pending");

            }else if(data.post=="submit application"){
                alert("Please submit application before posting");
            }else{
                alert("post fail");
            }
        }
         
        });
      });
   
})