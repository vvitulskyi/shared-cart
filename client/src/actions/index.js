const origin = location.origin;
// const origin = "http://localhost:9999";

const general = {
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const checkAuth = () =>
  fetch(`${origin}/api/v1/account/check-auth`, {
    ...general,
    method: "GET",
  });

export const getCartConnection = (cartLink) =>
  fetch(`${origin}/api/v1/shared-cart/connection/${cartLink}`, {
    ...general,
  });

export const postItemToCart = (productId, currentCart) =>
  fetch(`${origin}/api/v1/shared-cart/add-item`, {
    ...general,
    method: "POST",
    body: JSON.stringify({
      product_id: productId,
      cart_id: currentCart,
    }),
  });

export const getProductsList = () => fetch(`${origin}/api/v1/products/newest`);

export const postCreateList = () =>
  fetch(`${origin}/api/v1/products/create-list`, {
    ...general,
    method: "POST",
  });

export const postLogin = (values) =>
  fetch(`${origin}/api/v1/account/login`, {
    ...general,
    method: "POST",
    body: JSON.stringify(values),
  });

export const postRegistration = (values) =>
  fetch(`${origin}/api/v1/account/registration`, {
    ...general,
    method: "POST",
    body: JSON.stringify(values),
  });

export const postCartItemQuantity = (itemId, cartId, val) =>
  fetch(`${origin}/api/v1/shared-cart/set-quantity`, {
    ...general,
    method: "POST",
    body: JSON.stringify({
      product_id: itemId,
      cart_id: cartId,
      quantity: val,
    }),
  });

export const getCartItems = (cartId) =>
  fetch(`${origin}/api/v1/shared-cart/${cartId}`, {
    ...general,
    method: "GET",
  });

export const postClearCart = (cart_id) =>
  fetch(`${origin}/api/v1/shared-cart/clear`, {
    ...general,
    method: "POST",
    body: JSON.stringify({ cart_id }),
  });

export const postNewCart = () =>
  fetch(`${origin}/api/v1/shared-cart/create`, {
    ...general,
    method: "POST",
  });

export const postCreateLink = (cart_id) =>
  fetch(`${origin}/api/v1/shared-cart/create-link`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cart_id }),
  });
