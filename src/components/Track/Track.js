import React, {Component} from 'react';
import './Track.css'; //Load css for track components

class Track extends Component{

	//Function to handle adding a track to the playlist
	addTrack = () => {
		this.props.onAction(this.props.track);
	}

	//Function to handle removing a track from the playlist
	removeTrack = () => {
		this.props.onAction(this.props.track);
	}

	//Function to handle the action of show more information about the track
	//This function triggers when the user clicks on "More"
	trackInfo = () => {
		this.props.onMore(this.props.track);
	}

	//This function helps to identify is a + or - have to be displayed
	//Depending if the track is on the playlist or not
	renderAction = isRemoval => {
		if(isRemoval){ //If is added to the playlist display "-"
			return "-";
		}
		return "+"; //Otherwise "+"
	}

	render(){
		const {name, artist, album} = this.props.track; //Deconstruct name, artist and album of the track
		const {isRemoval} = this.props; //Decostruct isRemoval propierty
		return (
				<div className="Track">
  					<div className="Track-information">
    					<h3>{name}</h3>
    					<p>{artist} | {album}</p>
  					</div>
  					{(isRemoval) ? null : <a onClick={this.trackInfo} className="Track-action">More</a>}
  					<a className="Track-action" onClick={isRemoval ? this.removeTrack:this.addTrack}>{this.renderAction(isRemoval)}</a>
				</div>
			);
	}

}

export default Track;