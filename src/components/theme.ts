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
      main: "#663A21",
    },
    background: {
      default: "#BAAFA9",
      paper: "#BAAFA9",
    },
    text: {
      primary: "#3B2018",
    },
    mode: "light",
  },
});

export default createTheme(theme, {
  attribute: {
    intellect: theme.palette.augmentColor({
      color: {
        main: "#3f8695",
      },
      name: "intellect",
    }),
    motorics: theme.palette.augmentColor({
      color: {
        main: "#29AC29",
      },
      name: "motorics",
    }),
    physique: theme.palette.augmentColor({
      color: {
        main: "#b04938",
      },
      name: "physique",
    }),
    psyche: theme.palette.augmentColor({
      color: {
        main: "#ab46c4",
      },
      name: "psyche",
    }),
  },
});
