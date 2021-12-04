import classes from './ProductCardTemplate.module.css';

const ProductCardTemplate = (props) => {
  const templateClasses = `${classes.wrapper}${
    props.className ? props.className : ''
  }`;
  return (
    <div className={templateClasses} id={props.id}>
      <div onClick={props.onClick}>
        <img src={props.src} alt={props.name} />
      </div>
      <div onClick={props.onClick}>
        <span>{props.name}</span>
      </div>
    </div>
  );
};

export default ProductCardTemplate;
