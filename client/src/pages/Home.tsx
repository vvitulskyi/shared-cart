import { Title, Grid, Button, Drawer, AppShell, Flex } from "@mantine/core";
import CartIcon from "../images/CartIcon";
import ProductItem from "../components/ProductItem";
import Sidebar from "../components/Sidebar";
import useHomePage from "@hooks/useHomePage";

function Home() {
  const { products, setIsCartOpen, isCartOpen } = useHomePage();
  if (!products || !products.length) {
    return <h1>Loading...</h1>;
  }

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
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
            <ProductItem key={product._id.toString()} {...product} />
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
