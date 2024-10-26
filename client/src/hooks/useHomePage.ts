"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AppContext } from "@contexts/AppContextProvider";
import { useContext } from "react";
import { getCartConnection } from "@actions";
// import { IProduct } from "@interfaces/index";

export default function useHomePage() {
  const searchParams = useSearchParams();
  const link = searchParams.get("cart_connection");
  const router = useRouter();
  const [cartLink, setCartLink] = useState(link);
  // const [products, setProducts] = useState<IProduct[] | null>(null);
  const { isCartOpen, setIsCartOpen, setUser, setCurrentCart, user } =
    useContext(AppContext);

  useEffect(() => {
    if (cartLink) {
      getCartConnection(cartLink).then(async (res) => {
        if (res.ok) {
          router.push("/", { scroll: false });
          const data = await res.json();
          setUser(data);
          setCurrentCart({
            label: `${1}) ${data.shared_carts[0]}`,
            value: data.shared_carts[0],
          });
          setCartLink(null);
        } else {
          const data = await res.json();
          if (data.message == "You already have access to this cart") {
            router.push("/", { scroll: false });
            setCartLink(null);
          }
        }
        setIsCartOpen(true);
      });
    }
  }, [cartLink, user]);

  // useEffect(() => {
  //   if (!products) {
  //     getProductsList().then(async (res) => {
  //       if (res.ok) {
  //         let products: IProduct[] = await res.json();

  //         // Create produts, if list empty
  //         if (products && !products.length) {
  //           const resp = await postCreateList();
  //           products = await resp.json();
  //         }
  //         setProducts(products);
  //       }
  //     });
  //   }
  // }, []);

  return { setIsCartOpen, isCartOpen };
}
