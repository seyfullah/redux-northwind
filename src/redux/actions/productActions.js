import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function createProductSuccess(products) {
  return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: products };
}

export function updateProductSuccess(products) {
  return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: products };
}

export function saveProductApi(product) {
  return function (dispatch) {
    return fetch("http://localhost:3000/products/" + (product.id ? "/" + product.id : ""), {
      method: product.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
      .then(handleResponse)
      .catch(handleError)
      .then((savedProduct) => {
        product.id ? dispatch(updateProductSuccess(savedProduct)) : dispatch(createProductSuccess(savedProduct));
      });
  }
}

export function saveProduct(product) {
  return function (dispatch) {
    return saveProductApi(product).then(savedProduct => {
      product.id ? dispatch(updateProductSuccess(savedProduct)) : dispatch(createProductSuccess(savedProduct));
    })
      .catch(error => {
        throw error;
      });
  }
}

export async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    const error = await response.text();
    throw new Error(error);
  }
}

export async function handleError(error) {
  console.error("Bir hata oluştu");
  throw error;
}

export function getProducts(categoryId) {
  return function (dispatch) {
    debugger;
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getProductsSuccess(result)));
  }
}