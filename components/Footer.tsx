import { Box } from "@theme-ui/components";
import theme, { SX } from "../styles/theme";
import { ticker } from "../styles/keyframes";

export default function Footer() {
  return (
    <Box sx={sx.tickerWrap}>
      <Box sx={sx.ticker}>
        <Box sx={sx.tickerText}>
          CHAOS is an NFT project that allows anyone to own and customize their own on-page canvas.{" "}
        </Box>
        <Box sx={sx.tickerText}>
          CHAOS is an NFT project that allows anyone to own and customize their own on-page canvas.{" "}
        </Box>
        <Box sx={sx.tickerText}>
          CHAOS is an NFT project that allows anyone to own and customize their own on-page canvas.{" "}
        </Box>
        <Box sx={sx.tickerText}>
          CHAOS is an NFT project that allows anyone to own and customize their own on-page canvas.{" "}
        </Box>
      </Box>
    </Box>
  );
}

const sx: SX = {
  tickerWrap: {
    position: "fixed",
    bottom: 0,
    height: "100px",
    border: `1px solid ${theme.colors.text}`,
    overflow: "hidden",
    width: "100%",
    boxSizing: "content-box",
    display: "flex",
    alignItems: "center",
    bg: theme.colors.background,
  },
  ticker: {
    display: "inline-block",
    whiteSpace: "nowrap",
    boxSizing: "content-box",
    paddingRight: "100%",
    animation: `${ticker} 180s linear infinite`,
  },
  tickerText: {
    display: "inline",
    fontSize: "14px",
  },
};
