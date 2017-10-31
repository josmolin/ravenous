import React from 'react';
import './SearchBar.css';

let sortByOptions = {
  'Best Match': 'best_match',
  'Highest Rated': 'rating',
  'Most Reviewed': 'review_count'
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'best_match',
      term: '',
      location: ''
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  renderSortByOptions() {
    return (
      Object.keys(sortByOptions).map(sortByOption => {
        let sortByOptionValue = sortByOptions[sortByOption];
        return <li key={sortByOptionValue}
                   className={this.getSortByClass(sortByOptionValue)}
                   onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}
               </li>;
      })
    )
  }
  getSortByClass(sortByOption) {
    if(this.state.sortBy === sortByOption) {
      return 'active';
    }
    return '';
  }
  handleSortByChange(sortByOption) {
    this.setState({sortBy: sortByOption});
  }
  handleTermChange(event) {
    this.setState({term: event.target.value});
  }
  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }
  handleSearch(event) {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    event.preventDefault();
  }
  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input onChange={this.handleTermChange} placeholder="Search Businesses" />
          <input onChange={this.handleLocationChange}placeholder="Where?" />
        </div>
        <div onClick={this.handleSearch} className="SearchBar-submit">
          <a>Let's Go</a>
        </div>
      </div>
    );
  }
};

export default SearchBar;
