// Make our own module augmentation for custom palette mui theme
import "@mui/material/styles/createPalette";
declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    0: string;
    10: string;
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    1000: string;
  }

  interface TypeBackground {
    alt: string;
  }

  interface Palette {
    neutral: PaletteColor;
  }
}

export type Tokens = {
  grey: Record<number | string, string>;
  primary: Record<number | string, string>;
  secondary: Record<number | string, string>;
};
