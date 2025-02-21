import { useEffect, useRef, useState } from "react";
import { postCartItemQuantity } from "../actions";
export default function useItemQuantity({ item, setItems, cartId, }) {
    const [quantity, setQuantity] = useState(item.quantity || null);
    const timeout = useRef(null);
    useEffect(() => {
        setQuantity(item.quantity);
    }, [cartId, item.quantity]);
    const quantityHanler = (val) => {
        if (timeout.current)
            clearTimeout(timeout.current);
        setQuantity(Number(val));
        timeout.current = setTimeout(() => {
            postCartItemQuantity(item._id.toString(), cartId, val).then(async (res) => {
                if (res.ok) {
                    setItems(await res.json());
                }
                else {
                    setQuantity(item.quantity);
                    alert("Update error");
                }
            });
        }, quantity ? 500 : 0);
    };
    return { quantity, quantityHanler };
}
//# sourceMappingURL=useItemQuantity.js.map