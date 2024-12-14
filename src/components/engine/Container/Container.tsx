import React from "react";
import MuiContainer from "@mui/material/Container";
import { styled } from "@mui/material/styles";

const Offset = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
  width: "100%",
}));

export interface IContainer {
  children: React.ReactNode;
}

const Container = React.forwardRef<HTMLDivElement, IContainer>((props, ref) => {
  const { children, ...otherProps } = props;

  return (
    <MuiContainer
      {...otherProps}
      ref={ref}
      sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Offset />
      {children}
    </MuiContainer>
  );
});

export default Container;
