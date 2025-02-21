import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid, Card, Text, Button, Badge } from "@mantine/core";
import PropTypes from "prop-types";
import useProductItem from "./../hooks/useProductItem";
export default function ProductItem({ _id, name, description, price, currency, }) {
    const { handleAddToCart } = useProductItem();
    return (_jsx(Grid.Col, { span: { base: 12, xs: 6, md: 3 }, children: _jsxs(Card, { shadow: "sm", padding: "lg", children: [_jsx(Text, { children: name }), _jsx(Text, { size: "sm", style: { marginBottom: 10 }, children: description }), _jsxs(Badge, { color: "green", children: [price.toFixed(2), " ", currency] }), _jsx(Button, { onClick: () => handleAddToCart(_id.toString()), style: { marginTop: 10 }, color: "teal", children: "Add to Cart" })] }) }));
}
ProductItem.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    currency: PropTypes.string,
};
//# sourceMappingURL=ProductItem.js.map