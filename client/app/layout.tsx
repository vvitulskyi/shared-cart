import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import AppContextProvider from "../src/contexts/AppContextProvider";

export const metadata: Metadata = {
  title: "Shared Cart",
  description:
    "Shared Cart is a web application for collaborative editing of a cart",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <AppContextProvider>{children}</AppContextProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
