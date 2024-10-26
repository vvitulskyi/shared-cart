import { useContext } from "react";
import { postItemToCart } from "@actions";
import { AppContext } from "@contexts/AppContextProvider";

export default function useProductItem() {
  const { currentCart, setIsCartOpen } = useContext(AppContext);
  const handleAddToCart = (productId: string) => {
    if (!currentCart || !currentCart.value) {
      setIsCartOpen(true);
      return;
    }
    postItemToCart(productId, currentCart.value).then(async (res) => {
      if (res.ok) {
        setIsCartOpen(true);
      }
    });
  };
  return { handleAddToCart };
}
