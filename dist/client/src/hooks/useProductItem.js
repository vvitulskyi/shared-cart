import { useContext } from "react";
import { postItemToCart } from "../actions";
import AppContext from "../contexts/App";
export default function useProductItem() {
    const { currentCart, setIsCartOpen } = useContext(AppContext);
    const handleAddToCart = (productId) => {
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
//# sourceMappingURL=useProductItem.js.map