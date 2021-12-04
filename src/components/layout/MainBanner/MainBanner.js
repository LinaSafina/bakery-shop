import bannerImage from '../../../images/muffins_banner.jpg';
import classes from './MainBanner.module.css';

const MainBanner = () => {
  return (
    <div className={classes['main-image']}>
      <img src={bannerImage} alt='Delicious muffins' />
      {/* <button>Shop Now</button> */}
    </div>
  );
};

export default MainBanner;
