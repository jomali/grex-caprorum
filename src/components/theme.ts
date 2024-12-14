import { createTheme } from "@mui/material/styles";

interface IColor {
  main: string;
  light?: string;
  dark?: string;
  contrastText?: string;
}

declare module "@mui/material/styles" {
  interface Theme {
    attribute: {
      intellect: IColor;
      motorics: IColor;
      physique: IColor;
      psyche: IColor;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    attribute?: {
      intellect?: IColor;
      motorics?: IColor;
      physique?: IColor;
      psyche?: IColor;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#DA0037",
    },
    background: {
      default: "#171717",
      paper: "#171717",
    },
    mode: "dark",
  },
});

export default createTheme(theme, {
  attribute: {
    intellect: theme.palette.augmentColor({
      color: {
        main: "#6ba3af",
      },
      name: "intellect",
    }),
    motorics: theme.palette.augmentColor({
      color: {
        main: "#48E748",
      },
      name: "motorics",
    }),
    physique: theme.palette.augmentColor({
      color: {
        main: "#ff5439",
      },
      name: "physique",
    }),
    psyche: theme.palette.augmentColor({
      color: {
        main: "#b354ca",
      },
      name: "psyche",
    }),
  },
});
