import theme, { SX } from "../styles/theme";
import { blink } from "../styles/keyframes";
import { Box } from "@theme-ui/components";

export function Blinker() {
  return <Box sx={sx.blinker} />;
}

const sx: SX = {
  blinker: {
    bg: theme.colors.success,
    height: "5px",
    width: "5px",
    borderRadius: "50%",
    marginRight: "10px",
    animation: `${blink} 1s linear infinite`,
  },
};