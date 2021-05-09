// Goal: write an API to grab posts by subreddit; the consumer of 
// this API can pass a query string parameter; e.g.
// http://localhost:8888/.netlify/functions/reddit?subreddit=wallstreetbets
// The finished product should be an Array of "Reddit post" objects.
// Return only the URL, title, date published, and author of each post.

// allows us to use fetch
let fetch = require('node-fetch')

exports.handler = async function(event) {
  // Write the event Object to the back-end console
  console.log(event)

  // Get the parameter for which subreddit
  let subreddit = event.queryStringParameters.subreddit
  console.log(subreddit) // this will only go to the backend console

  // define the URL for Reddit posts data
  let url = `https://feed2json.org/convert?url=https%3A%2F%2Fwww.reddit.com%2Fr%2F${subreddit}%2F.rss`

  // - Fetch the url, wait for a response, store the response in memory
  let response = await fetch(url)
  console.log(response)

  // - Ask for the json-formatted data from the response, wait for the data, store it in memory
  let json = await response.json() 

  // - Write the json-formatted data to the back-end console. curly bracket means object
  //ALWAYs look at the data source to see what you're working with
  console.log(json)

  // Create a new Array to be returned by the API
  let subredditList = []

  // Loop through the posts, for each one:
  for(let i = 0; i < json.items.length; i++){
    // Store each post from the Reddit API in memory
    let post = json.items[i]

    // Create a new post object containing the pertinent fields
    let postObject = {
      //URL, title, date published, and author of each post.
      URL: post.url,
      title: post.title,
      datePublished: post.date_published,
      author: post.author
    }
    // Add (push) the post object to the final Array
    subredditList.push(postObject)
  }


  return {
    statusCode: 200,
    body: JSON.stringify(subredditList) // this must be a String
  }
}