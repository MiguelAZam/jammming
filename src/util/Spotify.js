var userToken = '';
var cliendID = ''; //Client ID given by spotify
var redirectURI = 'http://localhost:3000/'; //URI to redirect when we get our user token from spotify

var Spotify={
	//Method to identify if the user has a token in the local storage, otherwise
	//redirect him to accounts.spotify to get the token
	getAccessToken: () => {
		let token = localStorage.getItem("token"); //Look in local storage
		//If we find an access token return it
		if(token !== null){
			userToken = token;
			return userToken;
		}
		//Look in link if the access token is there
		var link = window.location.href;
		const accessToken = link.match(/access_token=([^&]*)/);
		var expiresIn = link.match(/expires_in=([^&]*)/);
		//If we find the access token and expiration
		if( accessToken != null && expiresIn != null){
			//Update variables and create local storage variables
			userToken = accessToken[1];
			expiresIn = expiresIn[1]
			localStorage.setItem("token", userToken);
			localStorage.setItem("date", new Date());
			//Clean link
			window.history.pushState('Access Token', null, '/');
			return userToken
		} else{
			//Save term in local storage 
			let searchTerm = document.getElementById("searchTerm").value;
			if(searchTerm !== null){
				localStorage.setItem("term", searchTerm);
			}
			//Redirect to spotify accounts to obtain an access token
			window.location.replace(`https://accounts.spotify.com/authorize?client_id=${cliendID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`);
		}
		return;
	},
	//Method to retrieve a list of tracks from the spotify API
	search: (term) => {
		//Make a GET request to obtain list of tracks
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: {Authorization: `Bearer ${userToken}`}}).then(resp => {
			//Transform response to json
			return resp.json();
		}).then(jsonResponse => {
			//if the response has tracks
			if(jsonResponse.tracks){
				//Map the tracks object and obtain
				//the song id, name, artist, album, uri, album image and preview UTR
				return jsonResponse.tracks.items.map(track => {
					return {
						id: track.id,
						name: track.name,
						artist: track.artists[0].name,
						album: track.album.name,
						uri: track.uri,
						albumImage: track.album.images[0].url,
						previewURL: track.preview_url,
					};
				});
			}
		}).catch(error => {}); //Catch response error
	},
	//Method to save a list of tracks as a playlist
	savePlaylist: (name, tracks) => {
		//Check if playlist has a name and has at least one track
		if(name !== '' && tracks.length !== 0){
			const headers = {Authorization: `Bearer ${userToken}`};
			var userID = '';
			//Make request to POST user id
			fetch('https://api.spotify.com/v1/me', {headers: headers}).then(resp => {
				return resp.json(); //Transform response to json
			}).then(jsonResponse => {
				//Get user id
				userID = jsonResponse.id;
				//Make request to POST a new playlist of name 'name'
				fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {headers: headers, method:'POST', body: JSON.stringify({name: name})}).then( resp => {
					return resp.json(); //Transform response to json
				}).then(jsonResponse => {
					var playlistID = jsonResponse.id; //Get id of playlist
					//Make request to POST tracks on the new playlist
					fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {headers: headers, method: 'POST', body: JSON.stringify({uris: tracks})});
				});
			});
		}
		return;
	},
	//Method to check if a token expired
	checkToken: () => {
		let actualDate = new Date(); //Get actual date
		let tokenCreation = new Date(localStorage.getItem("date")); //Get date of token creation
		let difference = (actualDate - tokenCreation)/1000; //Calculate difference between creation and actual date
		//If the difference is more than 3600 (1 hour) clear local storage to request a new token
		if(difference>3600){
			localStorage.clear();
			return;
		}
		//Otherwise, return token
		return userToken;
	}
};

export default Spotify;