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
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    this.state.playlistTracks.push(track);
    this.setState(this.state.playlistTracks);
  }

  removeTrack(myTrack){
    var newPlaylist = this.state.playlistTracks.filter(track =>{
      return (track.id!==myTrack.id)
    });
    this.setState({playlistTracks: newPlaylist});
  }

  updatePlaylistName(newName){
    this.setState({playlistName: newName});
  }

  savePlaylist(){
    var trackURI = [];
    this.state.playlistTracks.map(track => {
      return trackURI.push(track.uri);
    });
    Spotify.savePlaylist(this.state.playlistName, trackURI);
    this.setState({playlistName: "New Playlist", playlistTracks: []});
  }

  search(term){
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

