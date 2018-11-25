import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component{

	search = () => {
		if(this.state != null){
			this.props.onSearch(this.state.term);
		}
	}

	handleTermChange = (e) => {
		this.setState({term:e.target.value});
	}

	handleKeyPressed = (e) => {
		if(e.key === 'Enter'){
			this.search();
		}
	}

	render(){
		return (
				<div className="SearchBar zoomIn animated">
  					<input onChange={this.handleTermChange} onKeyPress={this.handleKeyPressed} placeholder="Enter A Song, Album, or Artist"/>
  					<a onClick={this.search}>SEARCH</a>
				</div>
			);
	}

}

export default SearchBar;