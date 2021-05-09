// Goal: create an API for a front-end developer to consume short-term
// rental listings for a "best of Airbnb" web application. Include the 
// number of available listings and the  listings with associated data, 
// e.g. { count: 200, listings: [...] }. Include only listings with an
// overall rating of 99 or better. Accept the minimum number of bedrooms
// as a querystring parameter.

// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {

  //have a look at the event object
  console.log(event)

  //grab number of bedrooms from query string parameters
  let numBedrooms = event.queryStringParameters.numBedrooms
  //write out the number of bedrooms requested
  console.log(`Number of bedrooms requested: ${numBedrooms}`)

  // read listings CSV file from disk
  let listingsFile = fs.readFileSync(`./listings.csv`)
  
  // turn the listings file into a JavaScript object, wait for that to happen
  let listingsFromCsv = await csv(listingsFile)

  // have a look in the console. Will appear below
  console.log(listingsFromCsv)

  // write the number of listings (the array's length) to the back-end console
  console.log(`There are ${listingsFromCsv.length} listings.`)
  // write the first few listings to the back-end console, to see what we're working with (can show you the fields we have)
  console.log(listingsFromCsv[0])


  // create a new object to hold the count and listings data

  // start with an empty Array for the listings
  let listingsToReturn = {
    count: 0,
    listings: []
  }
  
  // loop through all listings, for each one:
  for(let i = 0; i < listingsFromCsv.length; i++){

  
    // store each listing in memory
    let listing = listingsFromCsv[i]
    // check if the rating is at least 99, if so: (gotta go thru the console stuff below to find the variable name)
    if(listing.review_scores_rating >= 99 && listing.bedrooms >= numBedrooms){
      // add the listing to the Array of listings to return
      listingsToReturn.listings.push(listing) // adds the listing to the list
      listingsToReturn.count = listingsToReturn.count + 1 // each one we add, we increment count
    }

  }
  // add the number of listings to the returned listings Object

  // a lambda function returns a status code and a string of data
  return {
    statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    body: JSON.stringify(listingsToReturn) // a string of data
  }
}