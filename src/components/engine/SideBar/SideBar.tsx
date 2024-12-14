import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PersonIcon from "@mui/icons-material/Person";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SettingsIcon from "@mui/icons-material/Settings";
import { Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Tab, { TabProps } from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import useMediaQuery from "@mui/material/useMediaQuery";

export interface ISidebar {
  value: number;
  onChange: (newValue: number) => void;
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const ResponsiveTab = (props: TabProps) => {
  const { label, sx = {}, ...otherProps } = props;
  // FIXME - define correct type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isSmMode = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  return (
    <Tab
      label={isSmMode ? label : undefined}
      sx={{
        ...sx,
        fontSize: (theme) => theme.typography.pxToRem(15),
        justifyContent: "flex-start",
        maxHeight: (theme) => theme.spacing(6),
        minHeight: (theme) => theme.spacing(6),
        minWidth: 60,
        textTransform: "none",
        ...(isSmMode && {
          minWidth: 90,
        }),
      }}
      {...otherProps}
    />
  );
};

const SideBar = (props: ISidebar) => {
  const { onChange, value } = props;
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onChange(newValue);
  };

  return (
    <Tabs
      aria-label="Vertical tabs example"
      onChange={handleChange}
      orientation="vertical"
      sx={{
        borderLeft: "1px solid " + theme.palette.divider,
        maxWidth: 60,
        minWidth: 60,
        position: "relative",
        ".MuiTabs-indicator": {
          left: 0,
        },
        ".MuiTabs-scroller": {
          position: "fixed",
          maxWidth: 60,
          minWidth: 60,

          [theme.breakpoints.up("sm")]: {
            maxWidth: 180,
            minWidth: 180,
          },
          [theme.breakpoints.up("md")]: {
            maxWidth: 200,
            minWidth: 200,
          },
        },
        [theme.breakpoints.up("sm")]: {
          maxWidth: 180,
          minWidth: 180,
        },
        [theme.breakpoints.up("md")]: {
          maxWidth: 200,
          minWidth: 200,
        },
      }}
      value={value}
      variant="fullWidth">
      <ResponsiveTab
        icon={<PlayArrowIcon />}
        iconPosition="start"
        label="Acción" // FIXME - i18n
        {...a11yProps(0)}
      />
      <ResponsiveTab
        // disabled={true}
        icon={<MyLocationIcon />}
        iconPosition="start"
        label="Mapa" // FIXME - i18n
        {...a11yProps(1)}
      />
      {/* <ResponsiveTab
        // disabled={true}
        icon={<PersonIcon />}
        iconPosition="start"
        label="Ficha" // FIXME - i18n
        {...a11yProps(2)}
      /> */}
      <ResponsiveTab
        // disabled={true}
        icon={<FormatListBulletedIcon />}
        iconPosition="start"
        label="Tareas" // FIXME - i18n
        {...a11yProps(3)}
      />
      <Divider />
      <ResponsiveTab
        // disabled={true}
        icon={<SettingsIcon />}
        iconPosition="start"
        label="Configuración" // FIXME - i18n
        {...a11yProps(4)}
      />
    </Tabs>
  );
};

export default SideBar;
