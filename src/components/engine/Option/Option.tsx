import React from "react";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export interface IOption {
  attribute?: "default" | "intellect" | "motorics" | "physique" | "psyche";
  children: string;
  difficulty?: number;
  disabled?: boolean;
  onClick: VoidFunction;
  variant?: "default" | "election" | "highlight";
}

const Button = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "disabled",
})(({ disabled, theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: `${theme.shape.borderRadius}px`,
  color: theme.palette.primary.contrastText,
  display: "flex",
  flexGrow: 1,
  padding: theme.spacing(1.2, 3.2),
  // "&:hover": {
  //   backgroundColor: theme.palette.primary.dark,
  // },
  ...(disabled && {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  }),
}));

const AttributeSpan = styled("span", {
  shouldForwardProp: (prop) => prop !== "attribute",
})(({ attribute, theme }: { attribute: string; theme?: any }) => ({
  color: theme.attribute[attribute].main,
  marginRight: theme.spacing(1.2),
}));

const Option: React.FC<IOption> = (props) => {
  const {
    attribute = "default",
    children,
    difficulty,
    disabled,
    variant = "default",
    ...otherProps
  } = props;

  const difficultyString = React.useMemo(() => {
    let result;
    if (difficulty) {
      if (difficulty < 20) {
        result = "Muy fácil";
      } else if (difficulty < 40) {
        result = "Fácil";
      } else if (difficulty < 60) {
        result = "Normal";
      } else if (difficulty < 80) {
        result = "Difícil";
      } else {
        result = "Muy difícil";
      }
    }
    return result;
  }, [difficulty]);

  const buttonContents = React.useMemo(() => {
    switch (attribute) {
      case "intellect":
        return (
          <>
            <AttributeSpan attribute={attribute}>
              [Intelecto - {difficultyString}]
            </AttributeSpan>
            {children}
          </>
        );
      case "motorics":
        return (
          <>
            <AttributeSpan attribute={attribute}>
              [Motricidad - {difficultyString}]
            </AttributeSpan>
            {children}
          </>
        );
      case "physique":
        return (
          <>
            <AttributeSpan attribute={attribute}>
              [Físico - {difficultyString}]
            </AttributeSpan>
            {children}
          </>
        );
      case "psyche":
        return (
          <>
            <AttributeSpan attribute={attribute}>
              [Psique - {difficultyString}]
            </AttributeSpan>
            {children}
          </>
        );
      default:
        return children;
    }
  }, [attribute, children, difficultyString]);

  return (
    <Button
      disabled={disabled}
      focusRipple
      sx={{
        backgroundColor: "transparent",
        border: "1px solid",
        color: (theme) => theme.palette.primary.main,
        ...(variant === "highlight" && {
          backgroundColor: (theme) => theme.palette.primary.main,
          border: 0,
          color: (theme) => theme.palette.primary.contrastText,
        }),
      }}
      {...otherProps}>
      <Typography
        sx={{
          display: "initial",
          // flexDirection: "row",
        }}>
        {buttonContents}
      </Typography>
    </Button>
  );
};

export default Option;
