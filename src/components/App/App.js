import React, { Component } from 'react';
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
      playlistTracks: []
    };
  }

  addTrack = track => {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    const newList = this.state.playlistTracks.concat(track);
    this.setState({playlistTracks: newList});
  }

  removeTrack = myTrack => {
    var newPlaylist = this.state.playlistTracks.filter(track =>{
      return (track.id!==myTrack.id)
    });
    this.setState({playlistTracks: newPlaylist});
  }

  updatePlaylistName = newName => {
    this.setState({playlistName: newName});
  }

  savePlaylist = () =>{
    var trackURI = [];
    this.state.playlistTracks.map(track => {
      return trackURI.push(track.uri);
    });
    Spotify.savePlaylist(this.state.playlistName, trackURI);
    this.setState({playlistName: "New Playlist", playlistTracks: []});
  }

  search = term =>{
    Spotify.getAccessToken();
    Spotify.search(term).then(track => {
      this.setState({searchResults: track});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} onNameChange={this.updatePlaylistName}
            playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}
            onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
      );
  }
}

export default App;

