import classes from './ProductTemplate.module.css';

const ProductTemplate = (props) => {
  return (
    <div className={classes.card} id={props.id}>
      <img
        className={classes['product-image']}
        src={props.src}
        alt={props.name}
      />
      <h2 className={classes['product-name']}>{props.name}</h2>
    </div>
  );
};

export default ProductTemplate;
