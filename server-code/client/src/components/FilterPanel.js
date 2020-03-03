import React, { Component } from "react";
import Search from "./Search";

export default class FilterPanel extends React.Component {
  render() {
    return (
      <div className="filter-panel">
        {/* <p className="caption-strong">Search for a trip</p> */}
        <Search
          updateSearchText={this.props.updateSearchText}
          query={this.props.query}
          executeSearch={this.props.executeSearch}
        />
        <p className="caption-strong">Difficulty</p>
        <form>
          <label htmlFor="Easy">
            <input
              className="checkbox"
              type="checkbox"
              name="Easy"
              id="Easy"
              checked={this.props.easy}
              onChange={this.props.mutate}
            />
            Easy
          </label>

          <label htmlFor="Intermediate">
            <input
              className="checkbox"
              type="checkbox"
              name="Intermediate"
              id="Intermediate"
              checked={this.props.intermediate}
              onChange={this.props.mutate}
            />
            Intermediate
          </label>

          <label htmlFor="Advanced">
            <input
              className="checkbox"
              type="checkbox"
              name="Advanced"
              id="Advanced"
              checked={this.props.advanced}
              onChange={this.props.mutate}
            />
            Advanced
          </label>
          <button className="search-button" onClick={this.props.executeFilter}>
            Apply filters
          </button>
        </form>
      </div>
    );
  }
}
