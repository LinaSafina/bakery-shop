import CartItem from "../CartItem/CartItem";
import classes from "./Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { postCartData } from "../../../helpers/api";
import { cartActions } from "../../../store/cart-slice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartTotalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const authIsLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useHistory();
  const location = useLocation();
  const hasItems = cartItems.length > 0;

  const orderProductHandler = () => {
    if (!authIsLoggedIn) {
      history.push("/auth", { prevPage: location.pathname });
    } else {
      const cartData = {
        products: cartItems,
        totalAmount: cartTotalAmount,
        totalPrice: cartTotalPrice,
        customer: authUser,
      };
      postCartData(cartData)
        .then(() =>
          alert("We have recieved your order. Thank you for choosing us :)")
        )
        .catch((e) => alert(e));

      history.push("/products");
      dispatch(cartActions.clearCart());
    }
  };
  const clearCartHandler = () => {
    dispatch(cartActions.clearCart());
  };

  const cartData = cartItems.map((item) => {
    return <CartItem item={item} key={item.id} />;
  });

  return (
    <section className={classes.cart}>
      <div className={classes["cart__products"]}>
        {cartData}
        <div className={classes["cart__total"]}>
          <h2>Total</h2>
          <span>${cartTotalPrice.toFixed(2)}</span>
        </div>
        <div className={classes["cart__actions"]}>
          {hasItems && (
            <button className={"button add"} onClick={orderProductHandler}>
              Order
            </button>
          )}
          {hasItems && (
            <button className={"button cancel"} onClick={clearCartHandler}>
              Clear
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
