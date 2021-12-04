// import classes from './MainNavigation.module.css';
import { Fragment } from 'react';
import CategoryCards from '../components/HomePageLayout/CategoryCards/CategoryCards';
import MainBanner from '../components/layout/MainBanner/MainBanner';
import Layout from '../components/layout/Layout/Layout';
import HomePageDescription from '../components/HomePageLayout/HomePageDescription/HomePageDescription';

const HomePage = (props) => {
  return (
    <Fragment>
      {props.isLoading && <div className='centered title'>Loading...</div>}
      {!props.isLoading && (
        <Fragment>
          <MainBanner />
          <Layout>
            <HomePageDescription />
            <CategoryCards categories={props.categories} />
          </Layout>
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomePage;
