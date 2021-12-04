import React, { createContext } from 'react';
import { useReducer, useState } from 'react';

const ProductContext = React.createContext({
  categories: [],
  fetchCategories: () => {},
});

export const ProductProvider = (props) => {
  const fetchCategories = (data) => {
    this.categories.push(...data);
  };
  const cartValue = {
    categories: [],
    fetchCategories,
  };
  return (
    <ProductContext.Provider value={cartValue}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
