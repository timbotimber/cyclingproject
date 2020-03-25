import React from "react";

export default class Search extends React.Component {
  handleChange = e => {
    this.props.updateSearchText(e.target.value);
  };

  submitSearch = e => {
    this.props.executeSearch();
  };

  render() {
    return (
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Title, origin, or destination"
          className="search-input"
          value={this.props.query}
          onChange={this.handleChange}
        />
        <button className="search-button" onClick={this.submitSearch}>
          Search
        </button>
      </div>
    );
  }
}
