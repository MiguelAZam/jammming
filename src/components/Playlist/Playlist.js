import React, {Component} from 'react';
import TrackList from './../TrackList/TrackList.js';
import './Playlist.css';

class Playlist extends Component{

	//This method helps to handle when a user is changing the
	//name of a playlist
	handleNameChange = e => {
		this.props.onNameChange(e.target.value);
	}

	render(){
		//Deconstruct props for cleaner code
		const {onAction, onSave, playlistTracks} = this.props;
		return(
				<div className="Playlist bounceInUp animated">
  					<input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
 					<TrackList tracks={playlistTracks} onAction={onAction} isRemoval={true}/>
 					<a className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</a>
				</div>
				);
	}

}

export default Playlist;