import Head from "next/head";
import { SX } from "../styles/theme";
import { Box, Flex } from "@theme-ui/components";
import { Global } from "@emotion/react";
import Nav from "./Nav";
import Footer from "./Footer";
import { useModal } from "../hooks/useModal";

export default function Root({ children }) {
  const modal = useModal();
  return (
    <div>
      <Head>
        <title>C̴̡̆̕͝H̸̡̧͊͌̑Â̴̺̩̽O̴͈̠̒̓̓S̷̭͇̆͝</title>
        <meta name="description" content="Chaotic Canvas NFTs" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Global
        styles={{
          body: {
            margin: "0",
            fontFamily: "Work Sans",
            textTransform: "uppercase",
          },
          button: {
            background: "none",
            color: "inherit",
            border: "none",
            padding: 0,
            font: "inherit",
            cursor: "pointer",
            outline: "inherit",
          },
        }}
      />
      <Flex sx={sx.container}>
        <Box sx={sx.nav}>
          <Nav />
        </Box>
        <Box sx={sx.content}>{children}</Box>
        <Box sx={sx.footer}>
          <Footer />
        </Box>
      </Flex>
    </div>
  );
}

const sx: SX = {
  container: {
    margin: 0,
    padding: 0,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100vh",
  },
  content: {
    flex: "1 1 auto",
    width: "100%",
  },
  nav: {
    flex: "0 0 50px",
    width: "100%",
  },
  footer: {
    flex: "0 0 100px",
    width: "100%",
  },
};
