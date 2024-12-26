import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import { useTheme, alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";

// FIXME - define correct type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ElevationScroll = (props: { children: any }) => {
  const { children } = props;
  const theme = useTheme();

  const isTriggered = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    sx: {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default,
      borderBottom: "1px solid " + theme.palette.divider,
      zIndex: theme.zIndex.appBar,

      ...(isTriggered && {
        backgroundColor: alpha(theme.palette.background.default, 0.1),
        backdropFilter: "blur(2px)",
      }),
    },
  });
};

const AppBar = (props: { title: string }) => {
  const { title } = props;

  return (
    <>
      <ElevationScroll>
        <MuiAppBar elevation={0} position="fixed">
          <Toolbar>
            <Typography
              sx={{ fontWeight: (theme) => theme.typography.fontWeightBold }}>
              {title}
            </Typography>
          </Toolbar>
        </MuiAppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
};

export default AppBar;
