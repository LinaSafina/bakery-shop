import classes from './CategoryCards.module.css';
import CategoryImage from '../CategoryImage/CategoryImage';

const CategoryCards = (props) => {
  const productData = props.categories.map((item) => {
    return <CategoryImage key={item.id} name={item.name} src={item.image} />;
  });

  return <div className={classes.container}>{productData}</div>;
};

export default CategoryCards;
