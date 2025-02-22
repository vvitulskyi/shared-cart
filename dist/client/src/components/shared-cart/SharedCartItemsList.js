import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Title, Group, Button } from "@mantine/core";
import PropTypes from "prop-types";
import SharedCartItem from "./SharedCartItem";
import { useMemo } from "react";
import useItems from "./../../hooks/useItems";
export default function SharedCartItemsList({ cartId }) {
    const { items, setItems, clearHandler, checkoutHandler } = useItems({
        cartId,
    });
    const totalQuantity = useMemo(() => {
        let tq = 0;
        if (items && items.length) {
            tq = items.reduce((acc, curr) => {
                acc = acc + curr.quantity * curr.price;
                return acc;
            }, 0);
        }
        return tq;
    }, [items]);
    if (!items) {
        return (_jsx(Title, { order: 3, ta: "center", mt: "20", children: "Loading..." }));
    }
    if (!items.length) {
        return (_jsx(Title, { order: 3, ta: "center", mt: "20", children: "Cart is empty" }));
    }
    return (_jsxs(Box, { children: [items.map((item) => (_jsx(SharedCartItem, { item: item, setItems: setItems, cartId: cartId }, item._id.toString()))), _jsxs(Title, { order: 3, ta: "center", td: "underline", mt: "20", children: ["Total cost: ", totalQuantity.toFixed(2), " ", items[0].currency] }), _jsxs(Group, { justify: "center", mt: "md", wrap: "wrap", grow: true, children: [_jsx(Button, { w: "50%", miw: "200px", color: "red", onClick: clearHandler, children: "Clear cart" }), _jsx(Button, { w: "50%", miw: "200px", color: "green", onClick: checkoutHandler, children: "Continue to Checkout" })] })] }));
}
SharedCartItemsList.propTypes = {
    cartId: PropTypes.string.isRequired,
};
//# sourceMappingURL=SharedCartItemsList.js.map