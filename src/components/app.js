import React, { Component } from 'react';
import ProductList from '../containers/productList';

export default class App extends Component {
  static isPrivate = true;

  render() {
    return (
      <div>
        <ProductList />
      </div>
    );
  }
}
