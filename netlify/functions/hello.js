// defines a lambda function
exports.handler = async function(event) {

  // YOU can write stuff here!


  // a lambda function returns a status code and a string of data
  return {
    statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status this url tells you all the meanings. usually 200
    body: `Hello from the back-end!` // a string of data
  }
  

}