

function testing() {
    var resultElement = document.getElementById('getResult1');
    resultElement.innerHTML = '';

    axios.get('http://localhost:3000/user')
    .then(function(response){
    
    resultElement.innerHTML = generateSuccessHTMLOutput(response);


  })
  .catch(function(err){
    console.log("NOT WORKINGBRUH");

  });
  
    
}


function generateSuccessHTMLOutput(response) {
    return  '<h4>Result</h4>' + 
            '<h5>Status:</h5> ' + 
            '<pre>' + response.data[0].Username + '</pre>';

  }



  function verifyLogin(username, password) {
    var loc = window.location.pathname;
    var dir = loc.substring(0, loc.lastIndexOf('/'));

    const queryString = '/?username=' + username + '&password=' + password;
    axios.get('http://localhost:3000/checkLogin' + queryString)
    .then(function(response){

      if (response.data.length > 0) {
        console.log("Valid Login")
        window.location = dir + "/index.html";
      } else {
        console.log("Invalid Login")
      }

  })
  .catch(function(err){
    console.log(err);

  });
  
    
}