"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "@mantine/core/styles.css";
import { useState, useEffect } from "react";
import AppContext from "./contexts/App";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Connection from "./pages/Connection";
import { MantineProvider } from "@mantine/core";
import { checkAuth } from "./actions";
function App() {
    const [user, setUser] = useState(null);
    const [currentCart, setCurrentCart] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    useEffect(() => {
        checkAuth().then(async (res) => {
            if (res.ok) {
                const data = await res.json();
                setUser(data);
                setCurrentCart({
                    label: `1) ${data.shared_carts && data.shared_carts[0]}`,
                    value: data.shared_carts[0],
                });
            }
        });
    }, []);
    return (_jsx(MantineProvider, { children: _jsx(AppContext.Provider, { value: {
                user,
                setUser,
                currentCart,
                setCurrentCart,
                isCartOpen,
                setIsCartOpen,
            }, children: _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/cart-connection/:cartLink", element: _jsx(Connection, {}) })] }) }) }) }));
}
export default App;
//# sourceMappingURL=App.js.map