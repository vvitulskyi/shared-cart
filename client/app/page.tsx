import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Flex,
  Grid,
  Title,
} from "@mantine/core";
import { IProduct } from "./../../server/interfaces";
import { getProductsList, postCreateList } from "@actions";
import ProductItem from "@components/ProductItem";
import ClientBtn from "@components/next-components/ClientBtn";
import ClientSidebar from "@components/next-components/ClientSidebar";
import { Suspense } from "react";

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

export default async function MainPage() {
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
          <Title order={1}>Shared favorites</Title>
          <Suspense fallback={null}>
            <ClientBtn />
          </Suspense>
        </Flex>
      </AppShellHeader>

      <AppShellMain>
        <Grid>
          {products.map((product) => (
            <ProductItem key={product._id.toString()} {...product} />
          ))}
        </Grid>
        <Suspense fallback={null}>
          <ClientSidebar />
        </Suspense>
      </AppShellMain>
    </AppShell>
  );
}
