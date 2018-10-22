import React, {Component} from 'react';
import Track from './../Track/Track.js'
import './TrackList.css';

class TrackList extends Component{

	render(){
		return (
				<div className="TrackList">
    				{this.props.searchResults.map(track => {
    					return <Track name={track.name} artist={track.artist} album={track.album} key={track.id}/>;
    				})}
				</div>
			);
	}

}

export default TrackList;