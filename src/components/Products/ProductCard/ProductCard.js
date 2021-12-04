import classes from './ProductCard.module.css';

const ProductCard = (props) => {
  console.log(props);
  const { name, price, description, image, category } = props.data;
  return (
    <div className={classes.card}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <h3>${price}</h3>
      <p>{description}</p>
      <button className={classes.cancel} onClick={props.onClick}>
        Cancel
      </button>
    </div>
  );
};

export default ProductCard;
