import React, { Component } from 'react';
import MoreModal from './../MoreModal/MoreModal';
import SearchBar from './../SearchBar/SearchBar.js';
import SearchResults from './../Results/Results.js';
import Playlist from './../Playlist/Playlist.js';
import Spotify from './../../util/Spotify';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      playlistName: "New Playlist",
      searchResults: [],
      playlistTracks: [],
      modalInfo: {}
    };
  }

  //Method to add a track to the playlist list
  addTrack = track => {
    //Check if selected track already exist in playlist list
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    //Otherwise, add track to playlist list
    const newList = this.state.playlistTracks.concat(track);
    //Update state
    this.setState({playlistTracks: newList});
  }

  //Method to remove a track from the playlist list
  removeTrack = myTrack => {
    //Filter playlist array to remove track
    var newPlaylist = this.state.playlistTracks.filter(track =>{
      return (track.id!==myTrack.id)
    });
    //Update state
    this.setState({playlistTracks: newPlaylist});
  }

  //Method to get information from an specific track in such way
  //we can display that information into the modal
  getInfo = track => {
    //Display modal
    let modal = document.getElementById("myModal");
    modal.style.display = "block"; 
    //Update state to new track
    this.setState({modalInfo: track});
  }

  //Method to update state of name of playlist
  updatePlaylistName = newName => {

    //Update playlist name
    this.setState({playlistName: newName});
  }

  //Method to save a playlist in spotify
  savePlaylist = () =>{
    var trackURI = []; //array of track URI's
    //Map tracks and push uris to the array
    this.state.playlistTracks.map(track => {
      return trackURI.push(track.uri);
    });
    //Create playlist and post tracks in new playlist
    Spotify.savePlaylist(this.state.playlistName, trackURI);
    //Reset states to defaults
    this.setState({playlistName: "New Playlist", playlistTracks: []});
  }

  //Method to trigger search of a term
  //it checks if the token is still valid or if there is a token
  //if there is an invalid token or there is not a token, it obtains a new one
  search = term =>{
    Spotify.checkToken(); //Check if token expired
    let userToken = Spotify.getAccessToken(); //Obtain token
    if(userToken){ //if user token is not empty, search term
      Spotify.search(term).then(track => {
        this.setState({searchResults: track});
      }); 
    }
  }

  render() {
    return (
      <div>
        <MoreModal track={this.state.modalInfo}/>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAction={this.addTrack} onMore={this.getInfo}/>
            <Playlist  playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName} 
            onNameChange={this.updatePlaylistName} onAction={this.removeTrack} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
      );
  }
}

export default App;

