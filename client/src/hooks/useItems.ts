"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { IProductQuatitied } from "@interfaces/index";
import { getCartItems, postClearCart } from "@actions";
import { AppContext } from "@contexts/AppContextProvider";

export default function useItems({ cartId }: { cartId: string }) {
  const { setIsCartOpen } = useContext(AppContext);
  const [items, setItems] = useState<IProductQuatitied[] | null>(null);

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
      const ws = new WebSocket(`ws://${location.host}`);
      // const ws = new WebSocket(`ws://localhost:8080`);
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (cartId == data.cart_id) setItems(data.items);
      };

      ws.onerror = (event) => {
        console.error("WS error", event);
      };
      wsRef.current = ws;
    }

    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [cartId]);

  useEffect(() => {
    getCartItems(cartId).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    });
  }, [cartId]);

  const clearHandler = () => {
    postClearCart(cartId).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setItems(data);
        setIsCartOpen(false);
      }
    });
  };

  const checkoutHandler = () => {
    setIsCartOpen(false);
    setTimeout(() => alert("The order processing has been completed"), 500);
  };

  return { items, setItems, clearHandler, checkoutHandler };
}
