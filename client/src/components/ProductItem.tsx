"use client";

import { Card, Text, Button, Badge, Grid } from "@mantine/core";
import PropTypes from "prop-types";
import { IProduct } from "@interfaces/index";
import useProductItem from "@hooks/useProductItem";

export default function ProductItem({
  _id,
  name,
  description,
  price,
  currency,
}: IProduct) {
  const { handleAddToCart } = useProductItem();

  return (
    <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
      <Card shadow="sm" padding="lg">
        <Text>{name}</Text>
        <Text size="sm" style={{ marginBottom: 10 }}>
          {description}
        </Text>
        <Badge color="green">
          {price.toFixed(2)} {currency}
        </Badge>
        <Button
          onClick={() => handleAddToCart(_id.toString())}
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
