import { Route, Switch } from 'react-router-dom';
import PageFooter from './components/layout/PageFooter/PageFooter';
import HomePage from './pages/HomePage';
import MainNavigation from './components/layout/MainNavigation/MainNavigation';
import AllProducts from './pages/AllProducts';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import { Fragment, useEffect } from 'react';
import './App.css';
import Delivery from './pages/Delivery';
import Contacts from './pages/Contacts';
import { getAllCategories } from './helpers/api';
import useHttp from './hooks/useHttp';
import { ProductProvider } from './store/product-context';

// const categories = [
//   {
//     id: 'c1',
//     name: 'biscuits',
//     image: 'biscuits',
//   },
//   {
//     id: 'c2',
//     name: 'macarons',
//     image: 'macarons',
//   },
//   {
//     id: 'c3',
//     name: 'bread',
//     image: 'bread',
//   },
//   {
//     id: 'c4',
//     name: 'birthday cakes',
//     image: 'birthday cakes',
//   },
//   {
//     id: 'c5',
//     name: 'cupcakes',
//     image: 'cupcakes',
//   },
// ];

function App() {
  const { sendRequest, data } = useHttp(getAllCategories);
  let isLoading = true;
  useEffect(() => {
    sendRequest(
      'https://final-project-409c3-default-rtdb.firebaseio.com/categories.json'
    );
  }, [sendRequest]);

  if (!data) {
    isLoading = true;
  }

  if (data) {
    isLoading = false;
  }
  return (
    <Fragment>
      <div className='content-wrapper'>
        <MainNavigation />
        <main>
          {/* <ProductProvider> */}
          <Switch>
            <Route path='/' exact>
              <HomePage categories={data} isLoading={isLoading} />
            </Route>
            {!isLoading && (
              <Route path='/products'>
                <AllProducts categories={data} isLoading={isLoading} />
              </Route>
            )}

            <Route path='/auth'>
              <Auth />
            </Route>

            <Route path='/cart'>
              <Cart />
            </Route>

            <Route path='/contacts'>
              <Contacts />
            </Route>

            <Route path='/delivery'>
              <Delivery />
            </Route>
          </Switch>
          {/* </ProductProvider> */}
        </main>
        )
      </div>
      <PageFooter />
    </Fragment>
  );
}

export default App;
