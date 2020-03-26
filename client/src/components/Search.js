import React from 'react';

const Search = props => {
  const handleChange = e => {
    props.updateSearchText(e.target.value);
  };

  const submitSearch = e => {
    props.executeSearch();
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Title, origin, or destination"
        className="search-input"
        value={props.query}
        onChange={handleChange}
      />
      <button className="search-button" onClick={submitSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
