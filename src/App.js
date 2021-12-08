import { Route, Switch } from 'react-router-dom';
import PageFooter from './components/layout/PageFooter/PageFooter';
import HomePage from './pages/HomePage';
import MainNavigation from './components/layout/MainNavigation/MainNavigation';
import AllProducts from './pages/AllProducts';
import CartPage from './pages/CartPage';
import Auth from './pages/Auth';
import { Fragment, useEffect } from 'react';
import './App.css';
import Delivery from './pages/Delivery';
import Contacts from './pages/Contacts';
import { getAllCategories } from './helpers/api';
import useHttp from './hooks/useHttp';
import { CartProvider } from './store/cart-context';
import NotFound from './pages/NotFound';

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
      <CartProvider>
        <div className='content-wrapper'>
          <MainNavigation />
          <main>
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
                <CartPage />
              </Route>

              <Route path='/contacts'>
                <Contacts />
              </Route>

              <Route path='/delivery'>
                <Delivery />
              </Route>
              <Route path='*'>
                <NotFound />
              </Route>
            </Switch>
          </main>
        </div>
        <PageFooter />
      </CartProvider>
    </Fragment>
  );
}

export default App;
