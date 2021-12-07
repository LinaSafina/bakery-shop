import CartItem from '../CartItem/CartItem';
import classes from './Cart.module.css';
import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import AuthContext from '../../../store/auth-context';
import { useHistory, useLocation } from 'react-router';
import { postCartData } from '../../../helpers/api';

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const hasItems = cartCtx.items.length > 0;

  const orderProductHandler = () => {
    if (!authCtx.isLoggedIn) {
      history.push('/auth', { prevPage: location.pathname });
    } else {
      const cartData = {
        products: cartCtx.items,
        totalAmount: cartCtx.totalAmount,
        totalPrice: cartCtx.totalPrice,
        customer: authCtx.user,
      };
      postCartData(cartData)
        .then((response) =>
          alert('We have recieved your order. Thank you for choosing us :)')
        )
        .catch((e) => alert(e));

      history.push('/products');
      cartCtx.clear();
    }
  };
  const clearCartHandler = () => {
    cartCtx.clear();
  };

  const cartData = cartCtx.items.map((item) => {
    return <CartItem item={item} />;
  });
  return (
    <section className={classes.container}>
      {cartData}
      <div className={classes.total}>
        <h2>Total</h2>
        <span>${cartCtx.totalPrice}</span>
      </div>
      <div className={classes.actions}>
        {hasItems && (
          <button
            className={'button' + ' ' + 'add'}
            onClick={orderProductHandler}
          >
            Order
          </button>
        )}
        {hasItems && (
          <button
            className={'button' + ' ' + 'cancel'}
            onClick={clearCartHandler}
          >
            Clear
          </button>
        )}
      </div>
    </section>
  );
};

export default Cart;
