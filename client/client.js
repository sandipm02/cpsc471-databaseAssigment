function testing() {
    var resultElement = document.getElementById('getResult1');
    resultElement.innerHTML = '';

    axios.get('http://localhost:3000/user')
    .then(function(response){
    
    resultElement.innerHTML = generateSuccessHTMLOutput(response);


  })
  .catch(function(err){
    console.log(err);

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



function verifyRegistration(Fname, Lname, Username, Email, Password, Type, Locationid) {



  var loc = window.location.pathname;
  var dir = loc.substring(0, loc.lastIndexOf('/'));

  if (Fname != "" && Lname != "" && Username != "" && Email != "" && Password != "" &&  Type != "Select..." && Locationid != "Any Location") {
    var data = JSON.stringify({
      "Username": Username,
      "Email": Email,
      "Pword": Password,
      "Fname": Fname,
      "Lname": Lname,
      "Type": Type,
      "Locationid": Locationid
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
      console.log("Valid Registration")

      if (Type.localeCompare("Student") == 0) {
        console.log("Student Registration")
        window.location = dir + "/index.html";
      } else {
        window.location = dir + "/tutorRegistration.html";
      }
    })
    .catch(function (error) {
      console.log("Invalid username");
    });




  } else {
    console.log("Invalid registration form")
  }

}


function getLoggedUser() {
  return axios.get('http://localhost:3000/helper/getLoggedUser')
      .then(response => {

        return response.data;
      })
 }



function tutorRegistration(accredidation, major, grade, graddate, subject) {




  getLoggedUser()
  .then(data => {

    var loc = window.location.pathname;
    var dir = loc.substring(0, loc.lastIndexOf('/'));

    var Username = data;


    if (accredidation != "None" && major != "" && grade != 0 && graddate != "0001-01-01" && subject != "Select...") {
      



      // POST TO QUALIFICATION
      var data = JSON.stringify({
        "Username": Username,
        "Accredidation": accredidation,
        "Major": major,
        "Grade": parseInt(grade),
        "Graddate": graddate,
      });

      var config = {
        method: 'post',
        url: 'http://localhost:3000/qualification',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };


      axios(config)
      .then(function (response) {
        console.log("Valid Qualificiation Registration")
      })
      .catch(function (error) {
        console.log("Invalid Qualificiation Registration");
      });

      // POST TO SUBJECT

      var data = JSON.stringify({
        "Username": Username,
        "Subject": subject
      });

      var config = {
        method: 'post',
        url: 'http://localhost:3000/subject',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        console.log("Valid Subject Registration")
        window.location = dir + "/index.html";
      })
      .catch(function (error) {
        console.log("Invalid Subject Registration");
      });








    } else {
      console.log("Invalid tutor registration form")
    }
  });
    
}


function populateLocationList() {

  var listElement = document.getElementById('locationList');

  console.log("Getting locations")

  axios.get('http://localhost:3000/location')
  .then(function(response){
  

  var i = 0;
  response.data.forEach(element => {
    var opt = document.createElement('option');
    opt.value = element.Id;
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


function search() {

  var loc = window.location.pathname;
  var dir = loc.substring(0, loc.lastIndexOf('/'));
  
  

  axios.get('http://localhost:3000/user/tutors')
  .then(function(response){
  
    

    var resultElement = document.getElementById('resultsDiv');
    resultElement.innerHTML = '';


    
    var i = 0;
    response.data.forEach(element => {
    
      resultElement.innerHTML += generateResultsHTMLOutput(response.data[i]);
      i += 1;

    });


    
    
    


})
.catch(function(err){
  console.log(err);

});

}

function generateResultsHTMLOutput(response) {
  return  '<h4>Name' + response.Fname+ '</h4>' + 
          '<h5>Status:</h5> ' + 
          '<pre>' + response.Username + '</pre>';

}


//document.getElementById('subjectList').value, document.getElementById('accreditationList').value, document.getElementById('locationList').value, document.getElementById('ratingLIst').value