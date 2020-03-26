import React from 'react';
import Search from './Search';

const FilterPanel = props => {
  return (
    <div className="filter-panel">
      <div className="search-filters">
        {/* <p className="caption-strong">Search for a trip</p> */}
        <Search updateSearchText={props.updateSearchText} query={props.query} executeSearch={props.executeSearch} />

        <p className="caption-strong">Difficulty</p>
        <label htmlFor="Easy">
          <input
            className="checkbox"
            type="checkbox"
            name="Easy"
            id="Easy"
            checked={props.easy}
            onChange={props.mutate}
          />
          Easy
        </label>

        <label htmlFor="Intermediate">
          <input
            className="checkbox"
            type="checkbox"
            name="Intermediate"
            id="Intermediate"
            checked={props.intermediate}
            onChange={props.mutate}
          />
          Intermediate
        </label>

        <label htmlFor="Advanced">
          <input
            className="checkbox"
            type="checkbox"
            name="Advanced"
            id="Advanced"
            checked={props.advanced}
            onChange={props.mutate}
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
            checked={props.oneDay}
            onChange={props.mutate}
          />
          1 day ride
        </label>

        <label htmlFor="threeDay">
          <input
            className="checkbox"
            type="checkbox"
            name="threeDay"
            id="threeDay"
            checked={props.threeDay}
            onChange={props.mutate}
          />
          3 day ride
        </label>

        <label htmlFor="oneWeek">
          <input
            className="checkbox"
            type="checkbox"
            name="oneWeek"
            id="oneWeek"
            checked={props.oneWeek}
            onChange={props.mutate}
          />
          1 week ride
        </label>

        <label htmlFor="hardcore">
          <input
            className="checkbox"
            type="checkbox"
            name="hardcore"
            id="hardcore"
            checked={props.hardcore}
            onChange={props.mutate}
          />
          Hardcore
        </label>
      </div>

      <div className="filter-panel-button">
        <button className="search-button" onClick={props.executeFilter}>
          Apply filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
