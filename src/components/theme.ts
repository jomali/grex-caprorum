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
      main: "#683D2F",
    },
    secondary: {
      main: "#3f8695",
    },
    background: {
      default: "#EEEEEE",
      paper: "#FFFFFF",
    },
    mode: "light",
  },
});

export default createTheme(theme, {
  attribute: {
    skill: theme.palette.augmentColor({
      color: {
        main: "#3f8695",
      },
      name: "skill",
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
