import "@mantine/core/styles.css";
import { useState, useEffect } from "react";
import AppContext from "./contexts/App";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Connection from "./pages/Connection";
import { MantineProvider } from "@mantine/core";
import { checkAuth } from "./actions";
import { ICartOption, IUserInfo } from "@interfaces/index";

function App() {
  const [user, setUser] = useState<IUserInfo | null>(null);
  const [currentCart, setCurrentCart] = useState<ICartOption | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

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
