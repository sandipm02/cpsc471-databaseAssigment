const e = require("express");

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

function removeBooking(Sessionid, type) {


  var loc = window.location.pathname;
  var dir = loc.substring(0, loc.lastIndexOf('/'));

  var data = JSON.stringify({
    "Sessionid": Sessionid
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:3000/timeslot/remove',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    window.location = dir + "/" + type + "Main.html";
  })
  .catch(function (error) {
    console.log(error);
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
        window.location = dir + "/tutorMain.html";
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


function search(subject, accreditation, location, rating) {

  var locElement = document.getElementById('locationList');
  locElement.innerHTML = '<option selected>Any Location</option>';
  

  const queryString = '/?subject=' + subject + '&accreditation=' + accreditation + '&location=' + location + '&rating=' + rating;
  axios.get('http://localhost:3000/user/tutors' + queryString)
  .then(function(response){

    var resultElement = document.getElementById('resultsDiv');
    resultElement.innerHTML = '';


    var i = 0;
    response.data.forEach(element => {
      resultElement.innerHTML +=  generateResultTutorHTMLOutput(element, i);
 
      
      
      
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

function openModal(){
  populateLocationList();
  var myModal = new bootstrap.Modal(document.getElementById('searchModal'), {})
myModal.toggle()
}


function generateResultTutorHTMLOutput(response, i){
  var username = "'"+ response.Username + "'";
  return '<div class="response row"><div class="col-sm">'+
  '<img class="image" src="assets/card' + i + '.jpg">'+
  '</div>'+
  '<div class="col-sm" id = ' + i.toString() + '>'+
  '<h4>Name: ' + response.Fname+ ' ' + response.Lname + '</h4>' + 
  '<h5>Username: '+ response.Username + '</h5>' +
  '<p>Major: '+ response.Major + '</p>' +
  '<p>Subject: '+ response.Subjectname + '</p>' +
  '</div>'
  +'<div class="col-sm">'
  +'<button class="buttonSearch" data-bs-toggle="modal" data-bs-target="#bookingModal" onclick="getBookingTutor('+ username + ')">Book Now!</button>'
  +'</div>'
  +'</div>';
}
function getBookingTutor(username){
  var resultElement = document.getElementById('usernameDiv');
  resultElement.innerHTML = username;
}

function requestBooking(t_user, date, startTime, duration){
  console.log(startTime);

  console.log(t_user)
  console.log(date)
  console.log(startTime)
  console.log(duration)



   getLoggedUser()
   .then(data => {
     var username = data;

     var data = JSON.stringify({
       "T_username": t_user, 
       "S_username": username, 
       "User_date":date,
       "StartTime": startTime,
       "duration": duration
     });

     var config = {
       method: 'post',
       url: 'http://localhost:3000/timeslot',
         headers: { 
         'Content-Type': 'application/json'
       },
       data : data
     };

     axios(config)
     .then(function (response) {
       console.log("Booking added")
       //window.location = dir + "/studentMain.html";
     })
     .catch(function (error) {
       console.log("Booking error\n" + error);
     });

   });
}


function getTutorMain() {
  getLoggedUser()
  .then(data => {

    var Username = data;

    const queryString = '/?username=' + Username;
    axios.get('http://localhost:3000/user/tutor' + queryString)
    .then(function(response){
      console.log(response.data)
      console.log(response.data[0].Fname)

      var result = response.data[0];
      var resultElement = document.getElementById('tutorTitle');
      resultElement.innerHTML = result.Fname + " " + result.Lname;
  

    resultElement = document.getElementById('tutorImages');
    resultElement.innerHTML = '<img class="image" src="assets/card' + Math.floor(Math.random() * 8) + '.jpg">';

    resultElement = document.getElementById('tutorSubjects');
    var subjectArr = [];
    var i = 0;
    response.data.forEach(elem => {
      subjectArr.push(response.data[i].Subjectname)
      i += 1;
    })
    console.log(subjectArr)
      
    subjectArr.forEach(elem => {
      resultElement.innerHTML += elem + " ";
    })
    

    
    resultElement = document.getElementById('tutorQualification');
    resultElement.innerHTML = 'Highest Education Achieved: ' + result.Accredidation +
                              '<br>Major: ' + result.Major + 
                              '<br>Graduation Date: ' + result.Graddate + 
                              '<br>GPA: ' + result.Gpa + '.0';
    resultElement = document.getElementById('tutorLocation');
    resultElement.innerHTML = result.City + ", " + result.Stateprovince + ", " + result.Country;
    
    resultElement = document.getElementById('tutorEmail');
    resultElement.innerHTML = result.Email;
  })
    .catch(function(err){
      console.log(err);
    });

  axios.get('http://localhost:3000/timeslot/tutor' + queryString)
  .then(function(response){
    var i = 0; 
    var upcoming = document.getElementById('TutorTimeslots');
    var pending = document.getElementById('TutorTimeslotsPending');
    response.data.forEach(element => {
      
      var start = Math.floor(element.Time_start / 60) + ":";
      var end = Math.floor(element.Time_end / 60) + ":";
      if(element.Time_start %60 < 10){
        start += '0' + (element.Time_start %60); 
      }else{
        start +=element.Time_start %60;
      }
      if(element.Time_end %60 < 10){
        end += '0' + (element.Time_end %60); 
      }else{
        end +=element.Time_end %60;
      }

      if(element.IsApproved){
        upcoming.innerHTML += 'Student Username: ' + element.S_username +
                            '<br> Date: ' + element.User_date.slice(0, 10) + 
                            '<br> Start Time: ' + start + 
                            '<br> End Time: ' + end + 
                            '<br> Session ID [' + element.Sessionid + ']<hr>';
                            
      }else{
        pending.innerHTML += 'Student Username: ' + element.S_username +
                            '<br> Date: ' + element.User_date.slice(0, 10) + 
                            '<br> Start Time: ' + start + 
                            '<br> End Time: ' + end + 
                            '<br> Session ID [' + element.Sessionid + ']<hr>';
                            
      }

    })


    var bookList = document.getElementById('bookingList');

    response.data.forEach(element => {
      var opt = document.createElement('option');
      opt.value = element.Sessionid;
      opt.innerHTML = "[" + element.Sessionid + "] with " + element.S_username;
      bookList.appendChild(opt);
    });


  })
  .catch(function(err){
    console.log(err);
  });

  });
}
function generateTutorTimeslotHTMLOutput(response){
  return '<div class="timeslot">' + 
        '<h6>' + 'Student Name: ' + response.S_username + '</h6>' + 
        '<h6>' + 'Date: ' + response.User_date + '</h6>' + 
        '<h6>' + 'Start Time: ' + response.Time_start + '</h6>' + 
        '<h6>' + 'End Time: ' + response.Time_end + '</h6>' + 
        '</div>';
}
function generateTutorMainiHTMLOutput(response) {
  return  '<h4>Name' + response.Fname+ '</h4>' + 
          '<h5>Status:</h5> ' + 
          '<pre>' + response.Username + '</pre>';
}

function getStudentMain(){
  getLoggedUser()
  .then(data => {

    var Username = data;

    const queryString = '/?username=' + Username;
    axios.get('http://localhost:3000/user/student' + queryString)
    .then(function(response){
      var res = response.data[0];
      console.log(res);
      var resultElement = document.getElementById('studentInformation');
      resultElement.innerHTML = 'Name: ' + res.Fname + ' ' + res.Lname +
                            '<br>Username: ' + res.Username +
                            '<br>Email: ' + res.Email;

      

    }).catch(function(err){
      console.log(err);
    });
    var upcoming = document.getElementById('upcomingTimeSlots');
    var past = document.getElementById('pastTimeSlots');
    var pending = document.getElementById('pendingTimeSlots');
    axios.get('http://localhost:3000/timeslot/student' + queryString)
    .then(function(response){
      response.data.forEach(element => {
        console.log(element);
        var start = Math.floor(element.Time_start / 60) + ":";
        var end = Math.floor(element.Time_end / 60) + ":";
        if(element.Time_start %60 < 10){
          start += '0' + (element.Time_start %60); 
        }else{
          start +=element.Time_start %60;
        }
        if(element.Time_end %60 < 10){
          end += '0' + (element.Time_end %60); 
        }else{
          end +=element.Time_end %60;
        }
        if(element.IsApproved){
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          var time = today.getHours() * 60 + today.getMinutes();
          console.log(dd);
          if( (yyyy < element.User_date.slice(0, 4))
          || (yyyy == element.User_date.slice(0, 4) && mm < element.User_date.slice(5,7)) 
          || (yyyy == element.User_date.slice(0, 4) && mm == element.User_date.slice(5,7) && dd < element.User_date.slice(8,10)) 
          || (yyyy == element.User_date.slice(0, 4) && mm == element.User_date.slice(5,7) && dd == element.User_date.slice(8,10) && time < element.Time_start)  ){
            upcoming.innerHTML += 'Tutor Username: ' + element.T_username +
                              '<br> Date: ' + element.User_date.slice(0, 10) + 
                              '<br> Start Time: ' + start + 
                              '<br> End Time: ' + end + 
                              '<br> Session ID [' + element.Sessionid + ']<hr>';
          }else{
            past.innerHTML += 'Tutor Username: ' + element.T_username +
                              '<br> Date: ' + element.User_date.slice(0, 10) + 
                              '<br> Start Time: ' + start + 
                              '<br> End Time: ' + end + 
                              '<br> Session ID [' + element.Sessionid + ']<hr>';
          }
          
        }else{
          pending.innerHTML += 'Tutor Username: ' + element.T_username +
                              '<br> Date: ' + element.User_date.slice(0, 10) + 
                              '<br> Start Time: ' + start + 
                              '<br> End Time: ' + end + 
                              '<br> Session ID [' + element.Sessionid + ']<hr>';
                              
        }
      })

      var bookList = document.getElementById('bookingList');

      response.data.forEach(element => {
        var opt = document.createElement('option');
        opt.value = element.Sessionid;
        opt.innerHTML = "[" + element.Sessionid + "] with " + element.T_username;
        bookList.appendChild(opt);
      });



    }).catch(function(err){
    console.log(err);
  });
});
}


function editTutorProfile(accreditation, major, grade, graddate) {
  getLoggedUser()
  .then(data => {
    

    var loc = window.location.pathname;
    var dir = loc.substring(0, loc.lastIndexOf('/'));

    var Username = data;


    if (accreditation != "None" && major != "" && grade != 0 && graddate != "0001-01-01") {
      



      // POST TO QUALIFICATION
      var data = JSON.stringify({
        "Username": Username,
        "Accreditation": accreditation,
        "Major": major,
        "Grade": parseInt(grade),
        "Graddate": graddate,
      });

      var config = {
        method: 'post',
        url: 'http://localhost:3000/qualification/edit',
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


    } else {
      console.log("Invalid update")
    }


  });
    

}