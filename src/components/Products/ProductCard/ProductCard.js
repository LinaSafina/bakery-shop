import classes from './ProductCard.module.css';

const ProductCard = (props) => {
  return (
    <div
      className={classes['product-card']}
      id={props.id}
      onClick={props.onClick}
    >
      <div>
        <img src={props.src} alt={props.name} />
      </div>
      <div>
        <span>{props.name}</span>
      </div>
    </div>
  );
};

export default ProductCard;
