import { useEffect, useState } from 'react';
import useHttp from '../../../hooks/useHttp';
import { Fragment } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import classes from './ProductList.module.css';
import ProductModal from '../ProductModal/ProductModal';
import Modal from '../Modal/Modal';
import Loading from '../../layout/Loading/Loading';

const ProductList = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const { sendRequest, data } = useHttp(props.data.function);
  const categoryData = props.data.category;

  useEffect(() => {
    sendRequest(categoryData);
  }, [sendRequest, categoryData]);
  let productData;

  const closeModalHandler = () => {
    setIsModalVisible(false);
  };

  const openModalHandler = (event) => {
    setIsModalVisible(true);
    const productId = event.target.id;
    const product = data.find((product) => {
      return product.id === productId;
    });
    setCurrentProduct(product);
  };

  if (!data) {
    productData = <Loading />;
  }

  if (data) {
    productData = data.map((item) => {
      return (
        <ProductCard
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
          category={item.category}
          src={item.image}
          onClick={openModalHandler}
        />
      );
    });
  }
  if (data && data.length === 0) {
    productData = (
      <div className='centered'>We couldn't find any {categoryData}</div>
    );
  }

  return (
    <Fragment>
      <div className={classes['product-list']}>{productData}</div>
      {isModalVisible && (
        <Modal onClick={closeModalHandler}>
          <ProductModal data={currentProduct} onCancel={closeModalHandler} />
        </Modal>
      )}
    </Fragment>
  );
};

export default ProductList;
