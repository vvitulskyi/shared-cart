'use client';

import { useEffect, useRef, useState } from "react";
import { postCartItemQuantity } from "../actions";
import { IProductQuatitied } from "./../../../interfaces/index";

export default function useItemQuantity({
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

  return { quantity, quantityHanler };
}
