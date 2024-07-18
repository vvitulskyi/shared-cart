import { Box, Title, Group, Button } from "@mantine/core";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SharedCartItem from "./SharedCartItem";
import AppContext from "../../contexts/App";
import { useContext, useMemo, useRef } from "react";
import { getCartItems, postClearCart } from "../../actions";

export default function SharedCartItemsList({ cartId }) {
  const [items, setItems] = useState(null);
  const { setIsCartOpen } = useContext(AppContext);
  const wsRef = useRef(null);

  useEffect(() => {
    if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
      const ws = new WebSocket("ws://localhost:9999");
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("data", data.cart_id, cartId, data);
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
    return (
      <Title order={3} ta="center" mt="20">
        Loading...
      </Title>
    );
  }

  if (!items.length) {
    return (
      <Title order={3} ta="center" mt="20">
        Cart is empty
      </Title>
    );
  }

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

  return (
    <Box>
      {items.map((item) => (
        <SharedCartItem
          item={item}
          key={item._id}
          setItems={setItems}
          cartId={cartId}
        />
      ))}
      <Title order={3} ta="center" td="underline" mt="20">
        Total cost: {totalQuantity.toFixed(2)} {items[0].currency}
      </Title>
      <Group justify="center" mt="md" wrap="no-wrap">
        <Button w="50%" color="red" onClick={clearHandler}>
          Clear cart
        </Button>
        <Button w="50%" color="green" onClick={checkoutHandler}>
          Continue to Checkout
        </Button>
      </Group>
    </Box>
  );
}

SharedCartItemsList.propTypes = {
  cartId: PropTypes.string.isRequired,
};
