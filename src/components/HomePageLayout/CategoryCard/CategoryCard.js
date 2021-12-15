import classes from './CategoryCard.module.css';
import { useHistory } from 'react-router';

const CategoryCard = (props) => {
  const name = props.name.substr(0, 1).toUpperCase() + props.name.substr(1);
  const history = useHistory();
  const clickHandler = () => {
    const url = `/products/${props.name}`;
    history.push(url);
  };
  return (
    <div className={classes['category-card']}>
      <div onClick={clickHandler}>
        <img src={props.src} alt={props.name} />
      </div>
      <div onClick={clickHandler}>
        <span>{name}</span>
      </div>
    </div>
  );
};

export default CategoryCard;
