import CategoryNavigation from '../components/Products/CategoryNavigation/CategoryNavigation';
import ProductList from '../components/Products/ProductList/ProductList';
import Layout from '../components/layout/Layout/Layout';
import { Route } from 'react-router';
import { getAllProducts, getOneCategory } from '../helpers/api';
import { Fragment } from 'react';

const AllProducts = (props) => {
  const data = props.categories.map((category) => {
    const url = `/products/${category.name}`;
    return (
      <Route path={url} key={category.id}>
        <ProductList
          data={{ category: category.name, function: getOneCategory }}
        />
      </Route>
    );
  });

  return (
    <Layout>
      <Fragment>
        <CategoryNavigation categories={props.categories} />
        <Route path='/products' exact>
          <ProductList data={{ category: null, function: getAllProducts }} />
        </Route>
        {data}
      </Fragment>
    </Layout>
  );
};

export default AllProducts;
