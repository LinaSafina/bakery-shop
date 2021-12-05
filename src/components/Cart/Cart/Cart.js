import CartItem from '../CartItem/CartItem';
import classes from './Cart.module.css';

const Cart = () => {
  return (
    <section className={classes.container}>
      <CartItem />
      <CartItem />
      <div className={classes.total}>
        <h2>Total</h2>
        <span>$20</span>
      </div>
    </section>
  );
};

export default Cart;
