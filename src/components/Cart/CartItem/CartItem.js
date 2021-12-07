import classes from './CartItem.module.css';
import { useContext } from 'react';
import CartContext from '../../../store/cart-context';

const CartItem = (props) => {
  const cartCtx = useContext(CartContext);
  const addItemHandler = () => {
    const item = { ...props.item };
    item.amount = 1;
    cartCtx.addItem(item);
  };
  const removeItemHandler = () => {
    cartCtx.removeItem(props.item.id);
  };
  return (
    <div className={classes['cart-item']}>
      <div className={classes.summary}>
        <h2>{props.item.name}</h2>
        <span className={classes.price}>${props.item.price}</span>
        <span className={classes.amount}>×{props.item.amount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={removeItemHandler}>-</button>
        <button onClick={addItemHandler}>+</button>
      </div>
    </div>
  );
};

export default CartItem;
