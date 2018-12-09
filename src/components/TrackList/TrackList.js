import React, {Component} from 'react';
import Track from './../Track/Track.js'
import './TrackList.css';

class TrackList extends Component{

	//Function to display tracks in the DOM
	displayTracks = (tracks) => {
		//Deconstruct props for cleaner code
		const {onMore, onAction, isRemoval} = this.props;
		//Map tracks to display them in the track list component
		return tracks.map(track => {
    		return <Track onMore={onMore} track={track} onAction={onAction} isRemoval={isRemoval} key={track.id}/>;
    	});
	}

	render(){
		//Deconstruct props and get tracks
		const {tracks} = this.props;
		return (
				<div className="TrackList">
    				{this.displayTracks(tracks)}
				</div>
			);
	}

}

export default TrackList;