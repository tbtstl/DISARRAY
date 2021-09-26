import { ThemeUIStyleObject } from "@theme-ui/css";

export default {
  fonts: {
    body: '"Work Sans", Helvetica, system-ui, -apple-system, sans-serif',
    heading: '"Work Sans", Helvetica, system-ui, -apple-system, sans-serif',
  },
  fontSizes: [12, 14, 36, 144],
  colors: {
    text: "#000",
    background: "#FFF",
    grey: "#e5e5e5",
    success: "#7CFF4F",
    error: "#e72b2b",
  },
  hover: {
    bg: "#e5e5e5",
    transition: "300ms",
    cursor: "pointer",
  },
  images: {
    card: {
      width: 145,
      height: "auto",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
    },
  },
};

export type SX = {
  [key: string]: ThemeUIStyleObject;
};
