import classes from './CartItem.module.css';
import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import { useDispatch } from 'react-redux';

const CartItem = (props) => {
  // const cartCtx = useContext(CartContext);
  const dispatch = useDispatch()
  const addItemHandler = () => {
    const item = { ...props.item };
    item.amount = 1;
    dispatch({type: 'ADD', item: item});
  };
  const removeItemHandler = () => {
    dispatch({type: 'REMOVE', id: props.item.id});
  };
  return (
    <div className={classes['cart-item']}>
      <div className={classes['cart-item__card']}>
        <h2 className={classes['cart-item__title']}>{props.item.name}</h2>
        <span className={classes['cart-item__price']}>${props.item.price}</span>
        <span className={classes['cart-item__amount']}>
          ×{props.item.amount}
        </span>
      </div>
      <div className={classes['cart-item__actions']}>
        <button className={'button'} onClick={removeItemHandler}>
          -
        </button>
        <button className={'button'} onClick={addItemHandler}>
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
