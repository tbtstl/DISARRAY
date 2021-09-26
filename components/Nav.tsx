import theme, { SX } from "../styles/theme";
import { Box, Flex } from "@theme-ui/components";
import React from "react";
import { useModal } from "../hooks/useModal";
import { ModalType } from "../providers/ModalManager";
import { useWeb3 } from "../hooks/useWeb3";
import { Web3Status } from "../providers/Web3ReactManager";
import { Blinker } from "./Blinker";
import Link from "next/link";

export default function Nav() {
  const { openModal } = useModal();
  const { friendlyName, status } = useWeb3();

  return (
    <Flex sx={sx.container}>
      <Link href={"/"}>
        <Box sx={sx.brand} as="a">
          CHAOS
        </Box>
      </Link>
      {status === Web3Status.READY ? (
        <Link href={"/manage"}>
          <Flex sx={theme.button} as="a">
            <Blinker />
            {friendlyName}
          </Flex>
        </Link>
      ) : (
        <Box
          sx={theme.button}
          onClick={() => {
            openModal(ModalType.WEB3_CONNECT);
          }}
        >
          Connect
        </Box>
      )}
    </Flex>
  );
}

const sx: SX = {
  container: {
    width: "100%",
    justifyContent: "space-between",
    textAlign: "left",
    alignItems: "center",
    bg: theme.colors.background,
    position: "fixed",
    zIndex: 1,
  },
  brand: {
    padding: ["5px 10px", "5px 10px 5px 50px"],
    border: `1px solid ${theme.colors.text}`,
    flexGrow: 1,
    fontSize: "36px",
    cursor: "pointer",
  },
};
