import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Title, Grid, Button, Drawer, AppShell, Flex } from "@mantine/core";
import CartIcon from "../images/CartIcon";
import ProductItem from "../components/ProductItem";
import Sidebar from "../components/Sidebar";
import AppContext from "../contexts/App";
import { useContext } from "react";
import { getProductsList, getCartConnection, postCreateList } from "../actions";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const { link } = location.state || {};
  // todo
  const [cartLink, setCartLink] = useState(link);
  const [products, setProducts] = useState(null);
  const { isCartOpen, setIsCartOpen, setUser, setCurrentCart, user } =
    useContext(AppContext);

  useEffect(() => {
    if (cartLink) {
      getCartConnection(cartLink).then(async (res) => {
        if (res.ok) {
          navigate(location.pathname, { state: {} });
          const data = await res.json();
          setUser(data);
          setCurrentCart({
            label: `${1}) ${data.shared_carts[0]}`,
            value: data.shared_carts[0],
          });
          setCartLink(null);
        } else {
          const data = await res.json();
          if (data.message == "You already have access to this cart") {
            navigate(location.pathname, { state: {} });
            setCartLink(null);
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
    user,
  ]);

  useEffect(() => {
    getProductsList().then(async (res) => {
      if (res.ok) {
        let products = await res.json();

        // Create produts, if list empty
        if (products && !products.length) {
          const resp = await postCreateList();
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
