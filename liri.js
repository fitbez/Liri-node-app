//alternative to environment variables
var keys = require('./keys.js');
//connects to your twitter
var Twitter = require('twitter');
//spotify api
var spotify = require('spotify');
//allows ajax requests
var request = require('request');
//reads and writes files
var fs = require('fs');

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: 'e15e8878cd1b4f1f92dad97d828de5e3',
  secret: '8492ef3b8370497ca5654e7b13b33fc5'
});
var getMeSpotify = function(songName){

	if (songName === undefined){
		songName = 'The Sign';
	}

spotify.search({ type: 'track', query: songName }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
	else{
      var songInfo = data.tracks.items[0];
          console.log('');
                          console.log("Artist Name: " + songInfo.artists[0].name)
                          console.log("Song : " + songInfo.name)
                          console.log("Album: " + songInfo.album.name)
                          console.log("Preview link: " + songInfo.preview_url)
// console.log(songResult);
			}
  });
}

var getMyTweets = function(){

	var client = new Twitter(keys.twitterKeys);

	var params = {screen_name: '@Dr Tedros', count:20};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	  if (!error) {
	    // console.log(tweets);
	  	// debugger; //used to find out what's inside tweets in the iron-node console
	  	for(var i=0; i < tweets.length; i++){
	  		console.log(tweets[i].created_at);
	  		console.log('');
	  		console.log(tweets[i].text);
	  	}
	  }
	});
}

var getMeMovie = function(movieName){

	if (movieName === undefined){
		movieName = 'Mr Nobody';
	}
 // Here we construct our URL
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName +  "&y=&plot=short&apikey=40e9cece";



	request(queryUrl, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var jsonData = JSON.parse(body);

	    console.log('Title: ' + jsonData.Title);
	    console.log('Year: ' + jsonData.Year);
	    console.log('Rated: ' + jsonData.Rated);
	    console.log('IMDB Rating: ' + jsonData.imdbRating);
	    console.log('Country: ' + jsonData.Country);
	    console.log('Language: ' + jsonData.Language);
	    console.log('Plot: ' + jsonData.Plot);
	    console.log('Actors: ' + jsonData.Actors);
	   	console.log('Rotten Tomatoes Rating: ' + jsonData.tomatoRating);
	    console.log('Rotton Tomatoes URL: ' + jsonData.tomatoURL);
	  }
	});

}

var doWhatItSays = function(){
	fs.readFile("random.txt", "utf8", function(error, data) {
		console.log(data);
		//debugger; //use to see what data looks like

		var dataArr = data.split(',')

		if (dataArr.length == 2){
			pick(dataArr[0], dataArr[1]);
		}else if (dataArr.length == 1){
			pick(dataArr[0]);
		}

	});
}

var pick = function(caseData, functionData){
	switch(caseData) {
	    case 'my-tweets':
	        getMyTweets();
	        break;
	    case 'spotify-this-song':
	        getMeSpotify(functionData);
	        break;
	    case 'movie-this':
	    	getMeMovie(functionData);
	    	break;
	    case 'do-what-it-says':
	    	doWhatItSays();
	    	break;
	    default:
	        console.log('LIRI doesn\'t know that');
	}
}

// run this on load of js file
var runThis = function(argOne, argTwo){
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
