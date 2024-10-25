import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Flex,
  Grid,
  Title,
} from "@mantine/core";
import { IProduct } from "../../interfaces";
import { getProductsList, postCreateList } from "../src/actions";
import ProductItem from "../src/components/ProductItem";
import ClientBtn from "../src/components/next-components/ClientBtn";
import ClientSidebar from "../src/components/next-components/ClientSidebar";

const productList = async () => {
  const productsData = await getProductsList();
  let products: IProduct[] = await productsData.json();

  // Create produts, if list empty
  if (products && !products.length) {
    const resp = await postCreateList();
    products = await resp.json();
  }
  return products;
};

export default async function MainPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await productList();
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShellHeader>
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
          <ClientBtn />
        </Flex>
      </AppShellHeader>

      <AppShellMain>
        <Grid>
          {products.map((product) => (
            <ProductItem key={product._id.toString()} {...product} />
          ))}
        </Grid>

        <ClientSidebar />
      </AppShellMain>
    </AppShell>
  );
}
