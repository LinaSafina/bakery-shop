import { Route, Switch } from 'react-router-dom';
import PageFooter from './components/layout/PageFooter/PageFooter';
import HomePage from './pages/HomePage';
import MainNavigation from './components/layout/MainNavigation/MainNavigation';
import React, { Fragment, Suspense, useEffect, useState } from 'react';
import Delivery from './pages/Delivery';
import Contacts from './pages/Contacts';
import { getAllCategories } from './helpers/api';
import useHttp from './hooks/useHttp';
import NotFound from './pages/NotFound';
import Loading from './components/layout/Loading/Loading';

const AllProducts = React.lazy(() => import('./pages/AllProducts'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const Auth = React.lazy(() => import('./pages/Auth'));

// Web-приложение доступно для просмотра здесь https://final-project-409c3.web.app

function App() {
  const { sendRequest, data } = useHttp(getAllCategories);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    sendRequest(
      'https://final-project-409c3-default-rtdb.firebaseio.com/categories.json'
    );
  }, [sendRequest]);

  useEffect(() => {
    if (!data) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <Fragment>
      <MainNavigation />
      <main className='main'>
        <Suspense fallback={<Loading />}>
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
        </Suspense>
      </main>
      <PageFooter />
    </Fragment>
  );
}

export default App;
