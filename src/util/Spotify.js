var userToken = '';
var Spotify={
	getAccessToken: () => {
		if(userToken !== ''){
			return userToken;
		}
	}
};

export default Spotify;