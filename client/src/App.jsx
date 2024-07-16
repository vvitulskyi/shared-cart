import "@mantine/core/styles.css";
import { useState, useEffect } from "react";
import AppContext from "./contexts/App";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Connection from "./pages/Connection";
import { MantineProvider } from "@mantine/core";

function App() {
  const [user, setUser] = useState(null);
  const [currentCart, setCurrentCart] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:9999/api/v1/account/check-auth", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
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

  return (
    <MantineProvider>
      <AppContext.Provider
        value={{
          user,
          setUser,
          currentCart,
          setCurrentCart,
          isCartOpen,
          setIsCartOpen,
          // wsItems
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart-connection/:cartLink" element={<Connection />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </MantineProvider>
  );
}

export default App;
