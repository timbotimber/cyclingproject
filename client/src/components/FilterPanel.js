import React from "react";
import Search from "./Search";

export default class FilterPanel extends React.Component {
  render() {
    return (
      <div className="filter-panel">
        <div className="search-filters">
          {/* <p className="caption-strong">Search for a trip</p> */}
          <Search
            updateSearchText={this.props.updateSearchText}
            query={this.props.query}
            executeSearch={this.props.executeSearch}
          />

          <p className="caption-strong">Difficulty</p>
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

          <br />
          {/* DURATION */}
          <p className="caption-strong">Duration</p>

          <label htmlFor="oneDay">
            <input
              className="checkbox"
              type="checkbox"
              name="oneDay"
              id="oneDay"
              checked={this.props.oneDay}
              onChange={this.props.mutate}
            />
            1 day ride
          </label>

          <label htmlFor="threeDay">
            <input
              className="checkbox"
              type="checkbox"
              name="threeDay"
              id="threeDay"
              checked={this.props.threeDay}
              onChange={this.props.mutate}
            />
            3 day ride
          </label>

          <label htmlFor="oneWeek">
            <input
              className="checkbox"
              type="checkbox"
              name="oneWeek"
              id="oneWeek"
              checked={this.props.oneWeek}
              onChange={this.props.mutate}
            />
            1 week ride
          </label>

          <label htmlFor="hardcore">
            <input
              className="checkbox"
              type="checkbox"
              name="hardcore"
              id="hardcore"
              checked={this.props.hardcore}
              onChange={this.props.mutate}
            />
            Hardcore
          </label>
        </div>

        <div className="filter-panel-button">
          <button className="search-button" onClick={this.props.executeFilter}>
            Apply filters
          </button>
        </div>
      </div>
    );
  }
}
