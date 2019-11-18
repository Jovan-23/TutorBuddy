$(document).ready(() => {
 
    $.ajax({
      type: "get",
      url: "/getSessions",
      dataType: "json",
      success: function (data) {
        console.log(data);
    }
  });
})