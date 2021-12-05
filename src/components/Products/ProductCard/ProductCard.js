import classes from './ProductCard.module.css';

const ProductCard = (props) => {
  console.log(props);
  const { name, price, description, image, category } = props.data;
  return (
    <div className={classes.card}>
      <div className={classes.image}>
        <div>
          <img src={image} alt={name} />
        </div>
        <div>
          <h2>{name}</h2>

          <p>{description}</p>
          <h3>${price}</h3>
          <button className={classes.cancel} onClick={props.onClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
