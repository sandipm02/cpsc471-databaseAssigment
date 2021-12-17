
var username;
var password;

var loggedIn = false;



function testing() {
    var resultElement = document.getElementById('getResult1');
    resultElement.innerHTML = '';

    axios.get('http://localhost:3000/user')
    .then(function(response){
    
    resultElement.innerHTML = generateSuccessHTMLOutput(response);


  })
  .catch(function(err){
    console.log("NOT WORKING");

  });
  
    
}


function generateSuccessHTMLOutput(response) {
    return  '<h4>Result</h4>' + 
            '<h5>Status:</h5> ' + 
            '<pre>' + response.data[0].Username + '</pre>';

  }





function verifyLogin(username, password) {
  var resultElement = document.getElementById('wrongInput');
  var loc = window.location.pathname;
  var dir = loc.substring(0, loc.lastIndexOf('/'));
  resultElement.innerHTML = '';
  const queryString = '/?username=' + username + '&password=' + password;
  axios.get('http://localhost:3000/helper/checkLogin' + queryString)
  .then(function(response){

    if (response.data.length > 0) {
      console.log("Valid Login")
      window.location = dir + "/index.html";
    } else {
      resultElement.innerHTML = '<p>Incorrect username or password</p>';
      console.log("Invalid Login")
    }

  })
  .catch(function(err){
    console.log(err);

  });
  
    
}



function verifyRegistration(Fname, Lname, Username, Email, Password, Type) {

  var loc = window.location.pathname;
  var dir = loc.substring(0, loc.lastIndexOf('/'));

  if (Fname != "" && Lname != "" && Username != "" && Email != "" && Password != "" &&  Type != "Select...") {
    var data = JSON.stringify({
      "Username": Username,
      "Email": Email,
      "Pword": Password,
      "Fname": Fname,
      "Lname": Lname,
      "Type": Type
    });

    var config = {
      method: 'post',
      url: 'http://localhost:3000/user',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };


    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      console.log("Valid Registration")
          window.location = dir + "/login.html";
    })
    .catch(function (error) {
      console.log("Invalid username");
    });



    if (Type = "Student") {

    } else {

    }

  } else {
    console.log("Invalid registration form")
  }

}





function populateLocationList() {

  var listElement = document.getElementById('locationList');

  console.log("Getting locations")

  axios.get('http://localhost:3000/location')
  .then(function(response){
  

  var i = 0;
  response.data.forEach(element => {
    var opt = document.createElement('option');
    opt.value = element.City;
    opt.innerHTML = element.City;
    listElement.appendChild(opt);
  });
  


})
.catch(function(err){
  console.log(err);

});
}

function generateHTMLLocations(location) {
  return '<option>'+location+'</option>';
}