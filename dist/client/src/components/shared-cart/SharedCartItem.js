import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Grid, Text, Badge, NumberInput, ActionIcon, Flex, Divider, } from "@mantine/core";
import PropTypes from "prop-types";
import TrashIcon from "../../images/TrashIcon";
import useItemQuantity from "./../../hooks/useItemQuantity";
export default function SharedCartItem({ item, setItems, cartId, }) {
    const { quantity, quantityHanler } = useItemQuantity({ item, setItems, cartId });
    return (_jsxs(_Fragment, { children: [_jsxs(Grid, { grow: true, gutter: "xs", justify: "space-between", align: "stretch", style: {
                    marginBottom: 5,
                }, children: [_jsx(Grid.Col, { span: { base: 12, xs: 12, md: 4 }, children: _jsx(Flex, { align: "center", h: "100%", children: _jsx(Text, { truncate: "end", children: item.name }) }) }), _jsx(Grid.Col, { span: { base: 6, xs: 6, md: 4 }, children: _jsxs(Flex, { justify: "space-between", align: "center", children: [_jsxs(Badge, { color: "green", children: [item.price.toFixed(2), " ", item.currency] }), "x", _jsx(NumberInput, { placeholder: "quantity", clampBehavior: "strict", min: 1, max: 100, value: quantity || 0, w: "75", onChange: quantityHanler, allowDecimal: false, allowLeadingZeros: false, allowNegative: false })] }) }), _jsx(Grid.Col, { span: { base: 6, xs: 6, md: 4 }, children: _jsxs(Flex, { justify: "space-between", align: "center", children: [_jsxs(Text, { children: ["= ", (item.price * item.quantity).toFixed(2), " ", item.currency] }), _jsx(ActionIcon, { variant: "filled", color: "red", size: "lg", onClick: () => quantityHanler(0), children: _jsx(TrashIcon, {}) })] }) })] }), _jsx(Divider, { my: "xs" })] }));
}
SharedCartItem.propTypes = {
    item: PropTypes.object,
    setItems: PropTypes.func,
    cartId: PropTypes.string,
};
//# sourceMappingURL=SharedCartItem.js.map