import React from "react";
import axios from "axios";

export default class Search extends React.Component {
  handleChange = e => {
    this.props.updateSearchText(e.target.value);
  };

  submitSearch = e => {
    this.props.executeSearch();
  };

  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          placeholder="Search for title, origin, or destination"
          className="search"
          value={this.props.query}
          onChange={this.handleChange}
        />
        <button className="search-button" onClick={this.submitSearch}>
          Search
        </button>
      </React.Fragment>
    );
  }
}

// locations (very very vague)
// duration
// distance
// difficulty

// difficulty logic:
// Easy: < 50km
// Advance: > 150 km
// Intermediate: 51 < x < 149
