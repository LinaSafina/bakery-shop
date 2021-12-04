import AuthContext from '../store/auth-context';
import { allProductsImages, homePageImages } from './images';

const firebaseUrl =
  'https://final-project-409c3-default-rtdb.firebaseio.com/products.json';

const getData = async (
  requestUrl = firebaseUrl,
  query = null,
  images = allProductsImages
) => {
  let url;
  if (query) {
    url = `${requestUrl}${query}`;
  } else {
    url = requestUrl;
  }

  const response = await fetch(url);

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
  // {[{category: "biscuit", name: "namedfd"}, {}, {}]}
  return transformedProducts;
};

export const getAllProducts = async () => {
  return await getData();
};
export const getAllCategories = async (requestUrl) => {
  return await getData(requestUrl, null, homePageImages);
};
export const getOneCategory = async (category) => {
  return await getData(
    firebaseUrl,
    `?orderBy="category"&equalTo="${category}"`
  );
};

export const authRequest = async (requestUrl, requestBody) => {
  const response = await fetch(requestUrl, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: { 'Content-type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Auth request failed');
  }
  const responseData = await response.json();

  return responseData;
};

// export const signInRequest = async (requestBody) => {
//   authRequest({
//     url: ':signInWithPassword?key=AIzaSyCFGHri0Xo-TPaq3aKL3N4uKuf3zzdsToc',
//     body: requestBody,
//   });
// };

// export const signUpRequest = async (requestBody) => {
//   authRequest({
//     url: ':signUp?key=AIzaSyCFGHri0Xo-TPaq3aKL3N4uKuf3zzdsToc',
//     body: requestBody,
//   });
// };
