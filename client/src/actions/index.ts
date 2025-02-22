import { IUserLogin, IUserRegistration } from "@interfaces/index";

// const origin = location.origin;
// const origin = "http://localhost:8080";
// const origin = "http://ec2-13-48-147-66.eu-north-1.compute.amazonaws.com";
let origin = `http://${process.env.NEXT_PUBLIC_API_DOMAIN}`;

const general: RequestInit = {
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

export const getCartConnection = (cartLink: string) =>
  fetch(`${origin}/api/v1/shared-cart/connection/${cartLink}`, {
    ...general,
  });

export const postItemToCart = (productId: string, currentCart: string) =>
  fetch(`${origin}/api/v1/shared-cart/add-item`, {
    ...general,
    method: "PATCH",
    body: JSON.stringify({
      product_id: productId,
      cart_id: currentCart,
    }),
  });

export const getProductsList = () =>
  fetch(`${origin}/api/v1/products/newest`, { next: { revalidate: 30 } });

export const postCreateList = () =>
  fetch(`${origin}/api/v1/products/create-list`, {
    ...general,
    method: "POST",
  });

export const postLogin = (values: IUserLogin) =>
  fetch(`${origin}/api/v1/account/login`, {
    ...general,
    method: "POST",
    body: JSON.stringify(values),
  });

export const postLogout = () =>
  fetch(`${origin}/api/v1/account/logout`, {
    ...general,
    method: "POST",
  });

export const postRegistration = (values: IUserRegistration) =>
  fetch(`${origin}/api/v1/account/registration`, {
    ...general,
    method: "POST",
    body: JSON.stringify(values),
  });

export const postCartItemQuantity = (
  itemId: string,
  cartId: string,
  val: number | string
) =>
  fetch(`${origin}/api/v1/shared-cart/set-quantity`, {
    ...general,
    method: "PATCH",
    body: JSON.stringify({
      product_id: itemId,
      cart_id: cartId,
      quantity: val,
    }),
  });

export const getCartItems = (cartId: string) =>
  fetch(`${origin}/api/v1/shared-cart/${cartId}`, {
    ...general,
    method: "GET",
  });

export const postClearCart = (cart_id: string) =>
  fetch(`${origin}/api/v1/shared-cart/clear`, {
    ...general,
    method: "PATCH",
    body: JSON.stringify({ cart_id }),
  });

export const postNewCart = () =>
  fetch(`${origin}/api/v1/shared-cart/create`, {
    ...general,
    method: "PATCH",
  });

export const postCreateLink = (cart_id: string) =>
  fetch(`${origin}/api/v1/shared-cart/link/create`, {
    ...general,
    method: "POST",
    body: JSON.stringify({ cart_id }),
  });
