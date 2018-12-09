import React, {Component} from 'react';
import TrackList from './../TrackList/TrackList.js';
import './Results.css';

//This component displays tracks obtained after getting a response
//from the spotify API with a name song, album or artist
class Results extends Component{

	render(){
		const {onMore, searchResults, onAction} = this.props;
		return (
				<div className="SearchResults bounceInUp animated">
  					<h2>Results</h2>
  					<TrackList onMore={onMore} tracks={searchResults} onAction={onAction} isRemoval={false}/>
				</div>
			);
	}

}

export default Results;