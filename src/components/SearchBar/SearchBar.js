import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component{

	//Method to trigger search when user press Search button
	search = () => {
		if(this.state != null){
			this.props.onSearch(this.state.term);
		}
	}

	//Method to update state of term value when the user type song, album or artist
	handleTermChange = (e) => {
		this.setState({term:e.target.value});
	}

	//Method to trigger search when user press enter
	handleKeyPressed = (e) => {
		if(e.key === 'Enter'){
			this.search();
		}
	}

	render(){
		return (
				<div className="SearchBar zoomIn animated">
  					<input id="searchTerm" onChange={this.handleTermChange} onKeyPress={this.handleKeyPressed} placeholder="Enter A Song, Album, or Artist"/>
  					<a onClick={this.search}>SEARCH</a>
				</div>
			);
	}

}

export default SearchBar;