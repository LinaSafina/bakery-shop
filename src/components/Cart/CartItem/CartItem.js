import classes from './CartItem.module.css';

const CartItem = (props) => {
  return (
    <div className={classes['cart-item']}>
      <div className={classes.summary}>
        <h2>{props.name}Name</h2>
        <span className={classes.price}>${props.price}10</span>
        <span className={classes.amount}>{props.amount}× 1</span>
      </div>
      <div className={classes.actions}>
        <button>-</button>
        <button>+</button>
      </div>
    </div>
  );
};

export default CartItem;
