<<<<<<< HEAD
//Connecting to MongoDB
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@tutorbuddy-csxjn.azure.mongodb.net/test?retryWrites=true&w=majority";

// Creating a fucntion that vaidates the information for signing up
=======
>>>>>>> 6d7df1f76efcd01c0dd996ae530b99eedb3b811b
 


<<<<<<< HEAD
// Grabbing email, its error value and placeholder value
var email = document.getElementById('email');
var emailText = document.getElementById('email').getAttribute('placeholder');
var emailError = document.getElementById('emailError');

// Grabbing password, its error value and placeholder value
var password = document.getElementById('password');
var passwordText = document.getElementById('password').getAttribute('placeholder');
var passwordError = document.getElementById('passwordError');

// Grabbing confirm password, its error value and placeholder value
var confirmPassword = document.getElementById('confirmPassword');
var confirmPasswordText = document.getElementById('confirmPassword').getAttribute('placeholder');
var confirmPasswordError = document.getElementById('confirmPasswordError');

/**
 * Validation fucntion checks whether the fields in the form are valid
 * or not.
 */
function validation() {
    if (isEmpty(firstName, firstNameText, firstNameError)) {
        return false;
    }

    if (isEmpty(lastName, lastNameText, lastNameError)) {
        return false;
    }
    
    if (isEmpty(email, emailText, emailError)) {
        return false;
    }
    
    if (isEmpty(password, passwordText, passwordError)) {
        return false;
    }

    if (confirmPasswordValidation(password, confirmPassword, confirmPasswordError)) {
        return false;
    }

    alert("Sign Up submitted successfully");
    return true;
}

/**
 * This function check if the field is empty or not.
 * If the field is empty an error message displays.
 * 
 * @param {*} input 
 * @param {*} inputText 
 * @param {*} errorMessage 
 */
function isEmpty(input, inputText, errorMessage) {
    if (input.value.trim() == "") {
        input.style.border = "1px solid red";

        errorMessage.style.color = "red";
        errorMessage.innerHTML = "A " + inputText + " is required";
        return true;
    } else {
        return false;
    }
}

/**
 * Checks whether the confirm password mathces with the password field.
 * If not, an error message displays.
 * @param {*} pass 
 * @param {*} confirmPass 
 * @param {*} errorMessage 
 */
function confirmPasswordValidation(pass, confirmPass, errorMessage) {
    if (pass != confirmPass) {
        confirmPass.style.border = "1px solid red";

        errorMessage.style.color = "red";
        errorMessage.innerHTML = "The password and confirmation password do not match";
        return false;
    } else {
        return true;
    }
}

var jsonArray = [firstName,
                 lastName,
                 email,
                 confirmPassword];

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("TutorBuddy");
    dbo.collection("User").insertOne(jsonArray, function(err, res) {
        if (err) throw err;
        console.log("Insert user info into db");
        db.close();
    });
});
=======
$(document).ready(() => {
 
  $("#submitUP").click(() => {
      console.log("123");
      /** Server request that saves user info to database */
      $.ajax({
        type: "post",
        url: "/csignup",
        dataType: "json",
        data: {
          username:$("#firstName").val()+" "+$("#lastName").val(),
          email:  $("#email").val(),
          password: $("#password").val()
        },
        success: function (data) {
          console.log(data);
        
          if (data.signup == "ok") {
              window.location.href = "/home";
          } 
      }
       
      });
    });
 
})
   
     
>>>>>>> 6d7df1f76efcd01c0dd996ae530b99eedb3b811b
