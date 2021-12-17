

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

    const queryString = '/?username=' + username + '&password=' + password;
    axios.get('http://localhost:3000/checkLogin' + queryString)
    .then(function(response){
    
      console.log(response)

  })
  .catch(function(err){
    console.log("NOT WORKINGBRUH");

  });
  
    
}