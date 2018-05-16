import React, { Component } from 'react';

import './category.css';

export default class Category extends Component {
  constructor(props) {
    super(props);

    this.onCategoryClick = this.onCategoryClick.bind(this);
    this.onSubCategoryClick = this.onSubCategoryClick.bind(this);
  }

  onCategoryClick(e) {
    const { category } = this.props;
    this.props.onClick(category);
  }

  onSubCategoryClick(e) {
    const { category, subcategory } = this.props;
    this.props.onClick(`${category}:${subcategory}`);
  }

  render() {
    const { category, subcategory } = this.props;
    return (
      <span>
        <a className="category" href="javascript:" onClick={this.onCategoryClick}>{category}</a>
        :
        <a className="category" href="javascript:" onClick={this.onSubCategoryClick}>{subcategory}</a>
      </span>
    );
  }
}
