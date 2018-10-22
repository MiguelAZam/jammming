import React, { Component } from 'react';
import SearchBar from './../SearchBar/SearchBar.js';
import SearchResults from './../Results/Results.js';
import Playlist from './../Playlist/Playlist.js';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
                  searchResults: [{name: 'Call me', artist: 'Unlike Pluto', album: 'Disaster', id: '83769873487'}, 
                                  {name: 'Hi', artist: 'Unlike Pluto', album: 'Disaster', id: '83761273487'}],
                  selectedResults: [{name: 'Hi', artist: 'Unlike Pluto', album: 'Elemental', id: '22761273487'}]
                  };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist selectedResults={this.state.selectedResults}/>
          </div>
        </div>
      </div>
      );
  }
}

export default App;

