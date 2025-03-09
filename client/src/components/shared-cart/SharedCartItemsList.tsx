import { Box, Title, Group, Button } from "@mantine/core";
import PropTypes from "prop-types";
import SharedCartItem from "./SharedCartItem";
import { useMemo } from "react";
import useItems from "@hooks/useItems";

export default function SharedCartItemsList({ cartId }: { cartId: string }) {
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

  return (
    <Box>
      {items.map((item) => (
        <SharedCartItem
          item={item}
          key={item._id.toString()}
          setItems={setItems}
          cartId={cartId}
        />
      ))}
      <Title order={3} ta="center" td="underline" mt="20">
        Total cost: {totalQuantity.toFixed(2)} {items[0].currency}
      </Title>
      <Group justify="center" mt="md" wrap="wrap" grow={true}>
        <Button w="50%" miw="200px" color="red" onClick={clearHandler}>
          Clear list
        </Button>
      </Group>
    </Box>
  );
}

SharedCartItemsList.propTypes = {
  cartId: PropTypes.string.isRequired,
};
