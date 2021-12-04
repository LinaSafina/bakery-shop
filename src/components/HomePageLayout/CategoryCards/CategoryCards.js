import classes from './CategoryCards.module.css';
import { getAllCategories } from '../../../helpers/api';
import { useEffect } from 'react';
import useHttp from '../../../hooks/useHttp';
import { useHistory } from 'react-router';
import CategoryImage from '../CategoryImage/CategoryImage';

// const imageList = homePageImages.map((image) => {
//   return <ProductImage key={image.id} name={image.name} src={image.src} />;
// });

const CategoryCards = (props) => {
  const history = useHistory();
  const productData = props.categories.map((item) => {
    return (
      <CategoryImage
        key={item.id}
        name={item.name}
        src={item.image}
        // onClick={clickHandler}
      />
    );
  });

  return <div className={classes.container}>{productData}</div>;
};

export default CategoryCards;
