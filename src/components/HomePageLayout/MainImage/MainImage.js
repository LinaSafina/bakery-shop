import bannerImage from '../../../images/muffins_banner.jpg';
import classes from './MainImage.module.css';

const MainImage = () => {
  return (
    <div className={classes['main-image']}>
      <img src={bannerImage} alt='Delicious muffins' />
    </div>
  );
};

export default MainImage;
