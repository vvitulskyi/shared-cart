"use client";

import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContextProvider";
import { useContext } from "react";
import { getProductsList, getCartConnection, postCreateList } from "../actions";
import { IProduct } from "./../../../interfaces/index";

export default function useHomePage() {
  // const location = useLocation();
  // const navigate = useNavigate();
  // const { link } = location.state || {};
  // todo
  // const [cartLink, setCartLink] = useState(link);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const { isCartOpen, setIsCartOpen, setUser, setCurrentCart, user } =
    useContext(AppContext);

  // useEffect(() => {
  //   if (cartLink) {
  //     getCartConnection(cartLink).then(async (res) => {
  //       if (res.ok) {
  //         navigate(location.pathname, { state: {} });
  //         const data = await res.json();
  //         setUser(data);
  //         setCurrentCart({
  //           label: `${1}) ${data.shared_carts[0]}`,
  //           value: data.shared_carts[0],
  //         });
  //         setCartLink(null);
  //       } else {
  //         const data = await res.json();
  //         if (data.message == "You already have access to this cart") {
  //           navigate(location.pathname, { state: {} });
  //           setCartLink(null);
  //         }
  //       }
  //       setIsCartOpen(true);
  //     });
  //   }
  // }, [
  //   cartLink,
  //   location.pathname,
  //   navigate,
  //   setCurrentCart,
  //   setIsCartOpen,
  //   setUser,
  //   user,
  // ]);

  useEffect(() => {
    getProductsList().then(async (res) => {
      if (res.ok) {
        let products: IProduct[] = await res.json();

        // Create produts, if list empty
        if (products && !products.length) {
          const resp = await postCreateList();
          products = await resp.json();
        }
        setProducts(products);
      }
    });
  }, []);

  return { products, setIsCartOpen, isCartOpen };
}
