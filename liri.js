  // Node module imports
  // reads file system package
  var fs = require("fs");
  var request = require("request");
  var keys = require("./keys.js");
  var twitter = require ("twitter");
  var client = new twitter(keys.twitterKeys);
  var spotify = require ("node-spotify-api");
  var command = process.argv[2];
  var nodeArgv = process.argv;


// Commands with switch case
  switch(command) {
    case "my-tweets":
      myTweets();
      break;
    case "spotify-this-song":
      spotifyThisSong();
      break;
    case "movie-this":
      movieThis();
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;

    default:
      console.log("{node liri.js + : my-tweets, spotify-this-song, movie-this, do-what-it-says}")
      break;
  }

  function myTweets(){
    //Display last 20 Tweets
    var twitterUsername = { user_name: 'salmui_'};
    client.get('statuses/user_timeline/', twitterUsername, function(error, tweets, response){
      if(!error){
        for(var i = 0; i < tweets.length; i++){
          console.log(response);
          var date = tweets[i].created_at;
          console.log("@salmui_: " + tweets[i].text + " Created At: " + date.substring(0, 19));
        }
      }else{
        console.log('Error');
      }
    });
  }

// Spotify function

    var spotify = new Spotify({
      id: mySpotifyKeys.id,
      secret: mySpotifyKeys.secret
    });

	function spotifyThisSong(songName) {
		var songName = process.argv[3];
		if(!songName){
			songName = "Dilemma";
		}
		song = songName;
		spotify.search({ type: "track", query: song }, function(err, data) {
			if(!err){
				var songInfo = data.tracks.items[i];
				for (var i = 0; i < data.tracks.items.length; i++) {
					if (songInfo[i] != undefined) {
						var spotifyResults =
						("Artist: " + songInfo[i].artists[0].name);
						("Song: " + songInfo[i].name);
						("Album: " + songInfo[i].album.name);
						("Preview Url: " + songInfo[i].preview_url);
						console.log(spotifyResults);
					}
				}
			}	else {
				console.log("Error :"+ err);
				return;
			}
		});
	};

  // Movie function, uses the Request module to call the OMDB api
  function movieThis(){
    var movie = process.argv[3];
    if(!movie){
      movie = "Wonder Woman";
    }
    params = movie
    request("http://www.omdbapi.com/?&t=" + params + "&apikey=40e9cece", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var movieObject = JSON.parse(body);
        //console.log(movieObject)
        var movieResults =
        ("Title: " + movieObject.Title);
        ("Year: " + movieObject.Year);
        ("Imdb Rating: " + movieObject.imdbRating);
        ("Country: " + movieObject.Country);
        ("Language: " + movieObject.Language);
        ("Plot: " + movieObject.Plot);
        ("Actors: " + movieObject.Actors);
        ("Rotten Tomatoes Rating: " + movieObject.tomatoRating);
        ("Rotten Tomatoes URL: " + movieObject.tomatoURL);

        console.log(movieResults);
        log(movieResults); // calling log function
      } else {
        console.log("Error :"+ error);
        return;
      }
    });
  };
	// Do What It Says function
	function doWhatItSays() {
		fs.readFile("random.txt", "utf8", function(error, data){
			if (!error) {
				doWhatItSaysResults = data.split(",");
				spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
			} else {
				console.log("Error occurred" + error);
			}
		});
	};
