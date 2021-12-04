import { useEffect, useState } from 'react';
import useHttp from '../../../hooks/useHttp';
import { Fragment } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import classes from './ProductList.module.css';
import ProductTemplate from '../ProductTemplate/ProductTemplate';
import Modal from '../ProductModal/ProductModal';

const ProductList = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const { sendRequest, data } = useHttp(props.data.function);
  const categoryData = props.data.category;
  useEffect(() => {
    sendRequest(categoryData);
  }, [sendRequest, categoryData]);
  let productData;

  if (!data) {
    productData = <div className='centered title'>Loading...</div>;
  }

  if (data) {
    productData = data.map((item) => {
      return (
        <ProductTemplate
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
          category={item.category}
          src={item.image}
        />
      );
    });
  }
  if (data && data.length === 0) {
    productData = (
      <div className='centered'>We couldn't find any {categoryData}</div>
    );
  }

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

  return (
    <Fragment>
      <div className={classes['card-container']} onClick={openModalHandler}>
        {productData}
      </div>
      {isModalVisible && (
        <Modal onClick={closeModalHandler}>
          <ProductCard data={currentProduct} onClick={closeModalHandler} />
        </Modal>
      )}
    </Fragment>
  );
};

export default ProductList;
