import React, {Component} from 'react';
import Track from './../Track/Track.js'
import './TrackList.css';

class TrackList extends Component{

	render(){
		return (
				<div className="TrackList">
    				{this.props.searchResults ? this.props.searchResults.map(track => {
    					return <Track track={track} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} key={track.id}/>;
    				}) : this.props.tracks.map(track => {
    					return <Track track={track} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} key={track.id}/>;
    				})}
				</div>
			);
	}

}

export default TrackList;