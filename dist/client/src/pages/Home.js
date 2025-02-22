import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Title, Grid, Button, Drawer, AppShell, Flex } from "@mantine/core";
import CartIcon from "../images/CartIcon";
import ProductItem from "../components/ProductItem";
import Sidebar from "../components/Sidebar";
import useHomePage from "./../hooks/useHomePage";
function Home() {
    const { products, setIsCartOpen, isCartOpen } = useHomePage();
    if (!products || !products.length) {
        return _jsx("h1", { children: "Loading..." });
    }
    return (_jsxs(AppShell, { header: { height: 60 }, padding: "md", children: [_jsx(AppShell.Header, { children: _jsxs(Flex, { mih: 60, gap: "sm", justify: "space-between", align: "center", direction: "row", wrap: "wrap", ml: "40", mr: "40", children: [_jsx(Title, { order: 1, children: "Shared Cart" }), _jsx(Button, { onClick: () => setIsCartOpen(true), children: _jsx(CartIcon, {}) })] }) }), _jsxs(AppShell.Main, { children: [_jsx(Grid, { children: products.map((product) => (_jsx(ProductItem, { ...product }, product._id.toString()))) }), _jsx(Drawer, { opened: isCartOpen, onClose: () => setIsCartOpen(false), title: "Your Shared Carts", padding: "lg", position: "right", size: "lg", children: _jsx(Sidebar, {}) })] })] }));
}
export default Home;
//# sourceMappingURL=Home.js.map