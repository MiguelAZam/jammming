var userToken = '';
var cliendID = 'ed4388b93b1e46059a66011c8a176ef0';
var redirectURI = 'http://localhost:3000/';

var Spotify={
	getAccessToken: () => {
		if(userToken !== ''){
			return userToken;
		}
		var link = window.location.href;
		const accessToken = link.match(/access_token=([^&]*)/);
		var expiresIn = link.match(/expires_in=([^&]*)/);
		if( accessToken != null && expiresIn != null){
			userToken = accessToken[1];
			expiresIn = expiresIn[1]
			window.setTimeout(() => userToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			return userToken
		} else{
			window.location.replace(`https://accounts.spotify.com/authorize?client_id=${cliendID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`);
		}
		return;
	},
	search: (term) => {
		console.log(userToken);
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: {Authorization: `Bearer ${userToken}`}})
				.then(resp => {
					return resp.json();
				})
				.then(jsonResponse => {
					if(jsonResponse.tracks){
						return jsonResponse.tracks.items.map(track => {
							return {
								id: track.id,
								name: track.name,
								artist: track.artists[0].name,
								album: track.album.name,
								uri: track.uri,
							};
						});
					}
				})
	},
	savePlaylist: (name, tracks) => {
		if(name != null && tracks != null){
			const accessToken = userToken;
			const headers = {headers: {Authorization: `Bearer ${userToken}`}};
			var userID = '';
			fetch('https://api.spotify.com/v1/me', headers).then(resp => {
				return resp.json();
			}).then(jsonResponse => {
				console.log(jsonResponse);
				userID = jsonResponse.id;
			});
			console.log(userID);
		}
		return;
	}
};

export default Spotify;