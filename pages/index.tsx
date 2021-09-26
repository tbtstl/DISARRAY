import Head from 'next/head'
import Root from "../components/Root";
import { Flex } from "@theme-ui/components";
import theme, { SX } from "../styles/theme";
import Link from "next/link";
import { useCallback } from "react";
import { useWeb3 } from "../hooks/useWeb3";
import { Web3Status } from "../providers/Web3ReactManager";
import { useRouter } from "next/router";
import { ModalType } from "../providers/ModalManager";
import { useModal } from "../hooks/useModal";


export default function Home() {
  const { status } = useWeb3();
  const router = useRouter();
  const { openModal, ...rest } = useModal();

  const handleManageClick = useCallback(async () => {
    if (status === Web3Status.READY) {
      await router.push("/manage");
    } else {
      openModal(ModalType.WEB3_CONNECT);
    }
  }, [router, status, openModal]);

  return (
    <Root>
      <Flex sx={sx.container}>
        <Link href={"/browse"}>
          <Flex as="a" sx={sx.option}>
            BROWSE
          </Flex>
        </Link>
        <Link href={"/create"}>
          <Flex as="a" sx={sx.option}>
            CREATE
          </Flex>
        </Link>
        <Flex sx={sx.option} onClick={handleManageClick}>
          {status === Web3Status.READY ? "MANAGE" : "CONNECT"}
        </Flex>
      </Flex>
    </Root>
  );
}

const sx: SX = {
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  option: {
    width: "100%",
    border: `1px solid ${theme.colors.text}`,
    alignItems: "center",
    flexGrow: 1,
    fontSize: [68, 144],
    "&:nth-of-type(2)": {
      textAlign: "right",
      flexDirection: "row-reverse",
    },
    "&:hover": theme.hover,
  },
};
