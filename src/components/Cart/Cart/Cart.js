import CartItem from '../CartItem/CartItem';
import classes from './Cart.module.css';
import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import { useSelector, useDispatch } from 'react-redux';
import { useStore } from 'react-redux';
import AuthContext from '../../../store/auth-context';
import { useHistory, useLocation } from 'react-router';
import { postCartData } from '../../../helpers/api';

const Cart = () => {
  const cartItems = useSelector(state=>state.items)
  const cartTotalAmount = useSelector(state=>state.totalAmount)
  const cartTotalPrice = useSelector(state=>state.totalPrice)
  const dispatch = useDispatch()
  // const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const hasItems = cartItems.length > 0;

  const orderProductHandler = () => {
    if (!authCtx.isLoggedIn) {
      history.push('/auth', { prevPage: location.pathname });
    } else {
      const cartData = {
        products: cartItems,
        totalAmount: cartTotalAmount,
        totalPrice: cartTotalPrice,
        customer: authCtx.user,
      };
      postCartData(cartData)
        .then(() =>
          alert('We have recieved your order. Thank you for choosing us :)')
        )
        .catch((e) => alert(e));

      history.push('/products');
      dispatch({type: 'CLEAR'})
    }
  };
  const clearCartHandler = () => {
    dispatch({type: 'CLEAR'});
  };

  const cartData = cartItems.map((item) => {
    return <CartItem item={item} key={item.id} />;
  });

  return (
    <section className={classes.cart}>
      <div className={classes['cart__products']}>
        {cartData}
        <div className={classes['cart__total']}>
          <h2>Total</h2>
          <span>${cartTotalPrice.toFixed(2)}</span>
        </div>
        <div className={classes['cart__actions']}>
          {hasItems && (
            <button className={'button add'} onClick={orderProductHandler}>
              Order
            </button>
          )}
          {hasItems && (
            <button className={'button cancel'} onClick={clearCartHandler}>
              Clear
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
