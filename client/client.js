function testing() {
    
    axios.get('http://localhost:3000/user')
    .then(function(response){
    console.log(response);

  })
  .catch(function(err){
    console.log("NOT WORKINGBRUH");

  });
  
    
}
