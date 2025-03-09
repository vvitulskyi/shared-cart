"use client";
import { Drawer } from "@mantine/core";
import useHomePage from "@hooks/useHomePage";
import Sidebar from "../Sidebar";

export default function ClientSidebar() {
  const { setIsCartOpen, isCartOpen } = useHomePage();

  return (
    <Drawer
      opened={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      title="Your favorites"
      padding="lg"
      position="right"
      size="lg"
    >
      <Sidebar />
    </Drawer>
  );
}
