import { allProductsImages, homePageImages } from './images';

const firebaseUrl = 'https://final-project-409c3-default-rtdb.firebaseio.com';

const getData = async (requestUrl, images) => {
  const response = await fetch(requestUrl);

  const responseData = await response.json();
  if (!response.ok) {
    throw new Error('Request has failed');
  }
  const transformedProducts = [];
  for (const key in responseData) {
    const productObj = {
      id: key,
      ...responseData[key],
    };

    let imageSrc;
    images
      .filter((image) => {
        return image.name === productObj.image;
      })
      .forEach((image) => (imageSrc = image.src));

    productObj.image = imageSrc;

    transformedProducts.push(productObj);
  }
  return transformedProducts;
};

export const getAllProducts = async () => {
  return await getData(`${firebaseUrl}/products.json`, allProductsImages);
};
export const getAllCategories = async () => {
  return await getData(`${firebaseUrl}/categories.json`, homePageImages);
};
export const getOneCategory = async (category) => {
  return await getData(
    `${firebaseUrl}/products.json?orderBy="category"&equalTo="${category}"`,
    allProductsImages
  );
};

export const postCartData = async (cartObj) => {
  const response = await fetch(`${firebaseUrl}/cart.json`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(cartObj),
  });
  if (!response.ok) {
    throw new Error(
      "Sorry we couldn't send your order. You can try again or contact us via phone or email"
    );
  }
  return response;
};
