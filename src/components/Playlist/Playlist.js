import React, {Component} from 'react';
import TrackList from './../TrackList/TrackList.js';
import './Playlist.css';

class Playlist extends Component{

	handleNameChange = e => {
		this.props.onNameChange(e.target.value);
	}

	render(){
		return(
				<div className="Playlist bounceInUp animated">
  					<input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
 					<TrackList tracks={this.props.playlistTracks} 
 					searchResults={this.props.selectedResults} onRemove={this.props.onRemove} isRemoval={true}/>
 					<a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
				</div>
				);
	}

}

export default Playlist;