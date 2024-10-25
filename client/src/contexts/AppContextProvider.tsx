"use client";

import { useState, useEffect, createContext } from "react";
import { IAppContext, ICartOption, IUserInfo } from "../../../interfaces/index";
import { checkAuth } from "../actions";

export const AppContext = createContext<IAppContext>({} as IAppContext);

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
      {children}
    </AppContext.Provider>
  );
}
