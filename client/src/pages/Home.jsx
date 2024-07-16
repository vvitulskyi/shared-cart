import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Title, Grid, Button, Drawer, AppShell, Flex } from "@mantine/core";
import CartIcon from "../images/CartIcon";
import ProductItem from "../components/ProductItem";
import Sidebar from "../components/Sidebar";
import AppContext from "../contexts/App";
import { useContext } from "react";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const { link } = location.state || {};
  // todo
  const [cartLink] = useState(link);
  const [products, setProducts] = useState(null);
  const { isCartOpen, setIsCartOpen, setUser, setCurrentCart } =
    useContext(AppContext);

  useEffect(() => {
    if (cartLink) {
      fetch(`http://localhost:9999/api/v1/shared-cart/connection/${cartLink}`, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        if (res.ok) {
          navigate(location.pathname, { state: {} });
          const data = await res.json();
          setUser(data);
          setCurrentCart({
            label: `${1}) ${data.shared_carts[0]}`,
            value: data.shared_carts[0],
          });
        } else {
          const data = await res.json();
          if (data.message == "You already have access to this cart") {
            navigate(location.pathname, { state: {} });
          }
        }
        setIsCartOpen(true);
      });
    }
  }, [
    cartLink,
    location.pathname,
    navigate,
    setCurrentCart,
    setIsCartOpen,
    setUser,
  ]);

  useEffect(() => {
    fetch("http://localhost:9999/api/v1/products/newest").then(async (res) => {
      if (res.ok) {
        let products = await res.json();

        // Create produts, if list empty
        if (products && !products.length) {
          const resp = await fetch(
            "http://localhost:9999/api/v1/products/create-list",
            {
              method: "POST",
              credentials: "include",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          products = await resp.json();
        }
        setProducts(products);
      }
    });
  }, []);

  if (!products || !products.length) {
    return <h1>Loading...</h1>;
  }

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header padding="md">
        <Flex
          mih={60}
          gap="sm"
          justify="space-between"
          align="center"
          direction="row"
          wrap="wrap"
          ml="40"
          mr="40"
        >
          <Title order={1}>Shared Cart</Title>
          <Button onClick={() => setIsCartOpen(true)}>
            <CartIcon />
          </Button>
        </Flex>
      </AppShell.Header>

      <AppShell.Main>
        <Grid>
          {products.map((product) => (
            <ProductItem key={product._id} {...product} />
          ))}
        </Grid>

        <Drawer
          opened={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          title="Your Shared Carts"
          padding="lg"
          position="right"
          size="lg"
        >
          <Sidebar />
        </Drawer>
      </AppShell.Main>
    </AppShell>
  );
}

export default Home;
