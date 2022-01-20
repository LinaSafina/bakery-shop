import classes from "./ProductModal.module.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart-slice";

const ProductModal = (props) => {
  const { name, price, description, image } = props.data;
  const productAmountRef = useRef();
  const dispatch = useDispatch();

  const submitProductAmountHandler = (event) => {
    event.preventDefault();
    const currentInputValue = productAmountRef.current.value;
    if (currentInputValue < 1 || currentInputValue > 100) {
      alert("Amount should be between 1-100");
    } else {
      const productItem = {
        ...props.data,
        amount: +currentInputValue,
      };
      dispatch(cartActions.addItem(productItem));
    }
  };
  return (
    <div className={classes["product-modal"]}>
      <div className={classes.image}>
        <img src={image} alt={name} />
      </div>
      <div>
        <h2>{name}</h2>
        <p className={classes["product-modal__description"]}>{description}</p>
        <h3>${price}</h3>
        <form
          onSubmit={submitProductAmountHandler}
          className={classes.form}
          noValidate
        >
          <div>
            <label htmlFor="product-amount">Amount</label>
            <input
              type="number"
              name="product-amount"
              id="product-amount"
              ref={productAmountRef}
              min="1"
              max="100"
              defaultValue="1"
            />
          </div>
          <button onClick={props.onAdd} className={"add button"}>
            +Add
          </button>
        </form>
        <button className={"cancel button"} onClick={props.onCancel}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
