import { Grid, Card, Text, Button, Badge } from "@mantine/core";
import PropTypes from "prop-types";
import AppContext from "../contexts/App";
import { useContext } from "react";
import { postItemToCart } from "../actions";

export default function ProductItem({
  _id,
  name,
  description,
  price,
  currency,
}) {
  const { currentCart, setIsCartOpen } = useContext(AppContext);
  const handleAddToCart = (productId) => {
    postItemToCart(productId, currentCart.value).then(async (res) => {
      if (res.ok) {
        setIsCartOpen(true);
      }
    });
  };
  return (
    <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
      <Card shadow="sm" padding="lg">
        <Text weight={500}>{name}</Text>
        <Text size="sm" style={{ marginBottom: 10 }}>
          {description}
        </Text>
        <Badge color="green">
          {price.toFixed(2)} {currency}
        </Badge>
        <Button
          onClick={() => handleAddToCart(_id)}
          style={{ marginTop: 10 }}
          color="teal"
        >
          Add to Cart
        </Button>
      </Card>
    </Grid.Col>
  );
}

ProductItem.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  currency: PropTypes.string,
};
