import classes from './ProductCard.module.css';
import { useRef, useContext } from 'react';
import CartContext from '../../../store/cart-context';

const ProductCard = (props) => {
  const { name, price, description, image, category } = props.data;
  const productAmountRef = useRef();
  const cartCtx = useContext(CartContext);

  const submitProductAmountHandler = (event) => {
    event.preventDefault();
    const currentInputValue = productAmountRef.current.value;
    if (currentInputValue < 1 || currentInputValue > 100) {
      alert('Amount should be between 1-100');
    } else {
      const productItem = {
        ...props.data,
        amount: +currentInputValue,
      };
      console.log(currentInputValue);
      cartCtx.addItem(productItem);
    }
  };
  return (
    <div className={classes.card}>
      <div className={classes.image}>
        <div>
          <img src={image} alt={name} />
        </div>
        <div>
          <h2>{name}</h2>
          <p>{description}</p>
          <h3>${price}</h3>
          <form
            onSubmit={submitProductAmountHandler}
            className={classes.form}
            noValidate
          >
            <div>
              <label htmlFor='product-amount'>Amount</label>
              <input
                type='number'
                name='product-amount'
                id='product-amount'
                ref={productAmountRef}
                min='1'
                max='100'
                defaultValue='1'
              />
            </div>
            <button onClick={props.onAdd} className={'add' + ' ' + 'button'}>
              +Add
            </button>
          </form>
          <button
            className={'cancel' + ' ' + 'button'}
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
