import classes from './CategoryCards.module.css';
import CategoryCard from '../CategoryCard/CategoryCard';

const CategoryCards = (props) => {
  const productData = props.categories.map((item) => {
    return <CategoryCard key={item.id} name={item.name} src={item.image} />;
  });

  return <div className={classes['category-cards']}>{productData}</div>;
};

export default CategoryCards;
