import classes from './ProductTemplate.module.css';

const ProductTemplate = (props) => {
  return (
    <div className={classes.wrapper} id={props.id} onClick={props.onClick}>
      <div>
        <img src={props.src} alt={props.name} />
      </div>
      <div>
        <span>{props.name}</span>
      </div>
    </div>
  );
};

export default ProductTemplate;
