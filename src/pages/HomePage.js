import { Fragment } from 'react';
import CategoryCards from '../components/HomePageLayout/CategoryCards/CategoryCards';
import MainBanner from '../components/HomePageLayout/MainImage/MainImage';
import Layout from '../components/layout/Layout/Layout';
import HomePageDescription from '../components/HomePageLayout/HomePageDescription/HomePageDescription';
import Loading from '../components/layout/Loading/Loading';

const HomePage = (props) => {
  return (
    <Fragment>
      {props.isLoading && <Loading />}
      {!props.isLoading && (
        <Fragment>
          <MainBanner />
          <Layout>
            <HomePageDescription />
          </Layout>
          <CategoryCards categories={props.categories} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomePage;
