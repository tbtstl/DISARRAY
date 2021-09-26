import { keyframes } from "@emotion/react";

export const blink = keyframes`
  0% {
    opacity: 0;
  } 
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const ticker = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
`;
