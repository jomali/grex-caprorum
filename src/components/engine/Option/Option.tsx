import React from "react";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export interface IOption {
  attribute?: string;
  children: string;
  difficulty?: number;
  disabled?: boolean;
  onClick: VoidFunction;
  variant?: "default" | "election" | "highlight";
}

const Button = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "disabled",
})(({ disabled, theme }) => ({
  borderRadius: `${theme.shape.borderRadius}px`,
  color: theme.palette.primary.contrastText,
  display: "flex",
  flexGrow: 1,
  padding: theme.spacing(1.2, 3.2),
  ...(disabled && {
    color: theme.palette.action.disabled,
  }),
}));

const AttributeSpan = styled("span", {
  shouldForwardProp: (prop) => prop !== "attribute",
})(({ attribute, theme }: { attribute: string; theme?: any }) => ({
  color: theme.attribute[attribute].main,
  marginLeft: theme.spacing(1.2),
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
      case "default":
        return children;
      default:
        return (
          <>
            {children}
            <AttributeSpan attribute={attribute}>
              [{difficultyString}]
            </AttributeSpan>
          </>
        );
    }
  }, [attribute, children, difficultyString]);

  return (
    <Button
      disabled={disabled}
      focusRipple
      sx={{
        background: "transparent",
        border: "1px solid",
        color: (theme) => theme.palette.primary.main,
        ...(variant === "highlight" && {
          background: (theme) =>
            `linear-gradient(45deg, ${theme.palette.primary.main} 60%, ${theme.palette.secondary.main} 90%)`,
          border: 0,
          color: (theme) => theme.palette.primary.contrastText,
        }),
      }}
      {...otherProps}>
      <Typography
        sx={{
          display: "initial",
        }}>
        {buttonContents}
      </Typography>
    </Button>
  );
};

export default Option;
