import React, {Component} from 'react';
import TrackList from './../TrackList/TrackList.js';
import './Results.css';

class Results extends Component{

	render(){
		return (
				<div className="SearchResults">
  					<h2>Results</h2>
  					<TrackList searchResults={this.props.searchResults}/>
				</div>
			);
	}

}

export default Results;