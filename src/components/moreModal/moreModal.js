import React, { Component } from 'react';
import Spotify from  './../../util/Spotify';
import './MoreModal.css';

class moreModal extends Component {

    //Method to hide modal when user clicks out of the modal surface
	hideModal = (e) => {
        //Hide modal
		let modal = document.getElementById("myModal");
		modal.style.display = "none";
        //Pause song and reset time song to 0
        let song = document.getElementById("song");
        song.pause();
        song.currentTime=0;
	}

    render() {
        const {name, artist, albumImage, previewURL} = this.props.track
        return (
            <div id="myModal" className="container">
            	<div className="bgModal" onClick={this.hideModal}></div>
            	<div className="window" style={{height: `${window.innerHeight*.8}px`}}>
            		<div className="InfoBar">{name} | {artist}</div>
            		<div className="Image"><img alt="Album" src={albumImage}/></div>
            		<div className="Sample">
            			<audio id="song"src={previewURL} controls></audio>
            		</div>
            	</div>
            </div>
        );
    }
}

export default moreModal;
