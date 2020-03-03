import React, { Component } from "react";
import Search from "./Search";

export default class FilterPanel extends React.Component {
  render() {
    return (
      <Search
        updateSearchText={this.props.updateSearchText}
        query={this.props.query}
        executeSearch={this.props.executeSearch}
      />
    );
  }
}
