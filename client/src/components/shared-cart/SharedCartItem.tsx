import {
  Grid,
  Text,
  Badge,
  NumberInput,
  ActionIcon,
  Flex,
  Divider,
} from "@mantine/core";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import TrashIcon from "../../images/TrashIcon";
import { postCartItemQuantity } from "../../actions";
import { IProductQuatitied } from "@interfaces/index";

export default function SharedCartItem({
  item,
  setItems,
  cartId,
}: {
  item: IProductQuatitied;
  setItems: React.Dispatch<React.SetStateAction<IProductQuatitied[] | null>>;
  cartId: string;
}) {
  const [quantity, setQuantity] = useState(item.quantity || null);
  const timeout = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [cartId, item.quantity]);

  const quantityHanler = (val: string | number) => {
    if (timeout.current) clearTimeout(timeout.current);
    setQuantity(Number(val));
    timeout.current = setTimeout(
      () => {
        postCartItemQuantity(item._id.toString(), cartId, val).then(
          async (res) => {
            if (res.ok) {
              setItems(await res.json());
            } else {
              setQuantity(item.quantity);
              alert("Update error");
            }
          }
        );
      },
      quantity ? 500 : 0
    );
  };

  return (
    <>
      <Grid
        grow
        gutter="xs"
        justify="space-between"
        align="stretch"
        style={{
          marginBottom: 5,
        }}
      >
        <Grid.Col span={{ base: 12, xs: 12, md: 4 }}>
          <Flex align="center" h="100%">
            <Text truncate="end">{item.name}</Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 6, xs: 6, md: 4 }}>
          <Flex justify="space-between" align="center">
            <Badge color="green">
              {item.price.toFixed(2)} {item.currency}
            </Badge>
            x
            <NumberInput
              placeholder="quantity"
              clampBehavior="strict"
              min={1}
              max={100}
              value={quantity || 0}
              w="75"
              onChange={quantityHanler}
              allowDecimal={false}
              allowLeadingZeros={false}
              allowNegative={false}
            />
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 6, xs: 6, md: 4 }}>
          <Flex justify="space-between" align="center">
            <Text>
              = {(item.price * item.quantity).toFixed(2)} {item.currency}
            </Text>
            <ActionIcon
              variant="filled"
              color="red"
              size="lg"
              onClick={() => quantityHanler(0)}
            >
              <TrashIcon />
            </ActionIcon>
          </Flex>
        </Grid.Col>
      </Grid>
      <Divider my="xs" />
    </>
  );
}

SharedCartItem.propTypes = {
  item: PropTypes.object,
  setItems: PropTypes.func,
  cartId: PropTypes.string,
};
