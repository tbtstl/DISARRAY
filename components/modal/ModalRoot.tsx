import { Flex } from "@theme-ui/components";
import theme, { SX } from "../../styles/theme";

export interface ModalRootProps {
  showModal: boolean;
}

export default function ModalRoot({ children, showModal }) {
  return showModal ? <Flex sx={sx.container}>{children}</Flex> : null;
}

const sx: SX = {
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    zIndex: 1,
    bg: theme.colors.grey,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};