"use client";
import { Button } from "@mantine/core";
import useHomePage from "@hooks/useHomePage";
import CartIcon from "@images/CartIcon";

export default function ClientBtn() {
  const { setIsCartOpen } = useHomePage();

  return (
    <Button onClick={() => setIsCartOpen(true)}>
      <CartIcon />
    </Button>
  );
}
