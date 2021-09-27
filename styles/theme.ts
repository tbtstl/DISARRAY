import { ThemeUIStyleObject } from '@theme-ui/css';

export default {
  fonts: {
    body: '"Work Sans", Helvetica, system-ui, -apple-system, sans-serif',
    heading: '"Work Sans", Helvetica, system-ui, -apple-system, sans-serif',
  },
  fontSizes: [12, 14, 36, 144],
  colors: {
    text: '#000',
    background: '#FFF',
    grey: '#e5e5e5',
    success: '#7CFF4F',
    error: '#e72b2b',
  },
  hover: {
    bg: '#e5e5e5',
    transition: '300ms',
    cursor: 'pointer',
  },
  images: {
    card: {
      width: 145,
      height: 'auto',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
    },
  },
  forms: {
    input: {
      padding: '5px 10px',
      borderRadius: 0,
      margin: '10px 0',
      backgroundColor: 'grey',
      border: '1px solid white',
      lineHeight: '42px',
      '&:focus': {
        backgroundColor: 'white',
        border: '1px solid black',
        outline: 'none',
      },
    },
  },
  get button() {
    return {
      padding: '5px 10px',
      flexShrink: 1,
      border: `1px solid ${this.colors.text}`,
      lineHeight: '42px',
      alignItems: 'center',
      '&:hover': this.hover,
    };
  },
};

export type SX = {
  [key: string]: ThemeUIStyleObject;
};
