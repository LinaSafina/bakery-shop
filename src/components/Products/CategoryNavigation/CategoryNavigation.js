import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import classes from './CategoryNavigation.module.css';
import useHttp from '../../../hooks/useHttp';
import { getAllCategories } from '../../../helpers/api';
import { useEffect } from 'react';

const CategoryNavigation = (props) => {
  console.log(props.categories);
  const categoryData = props.categories.map((item) => {
    const url = `/products/${item.name}`;
    const name = item.name.substr(0, 1).toUpperCase() + item.name.substr(1);

    return (
      <li key={item.id}>
        <NavLink to={url} activeClassName={classes.active} exact>
          {name}
        </NavLink>
      </li>
    );
  });

  return (
    <div className={classes.container}>
      <ul>
        <li>
          <NavLink to='/products' activeClassName={classes.active} exact>
            All Products
          </NavLink>
        </li>
        {categoryData}
      </ul>
    </div>
  );
};

export default CategoryNavigation;
