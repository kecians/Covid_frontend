
import * as React from "react";
import { useTheme } from "@mui/styles";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TabPanel from "../../Components/Dashboard/Info/TabPanel";
import RightSection from "../../Components/Dashboard/Info/RightSection";
import { MdSpaceDashboard } from "react-icons/md";
import { BsCalendarPlusFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaClipboardList } from "react-icons/fa";
import { TbHeartRateMonitor } from "react-icons/tb";
import Searchbar from "../../Components/Searchbar/Searchbar";
import PatientList from "../../Components/Dashboard/PatientList";
import { getComputedStyle } from "./style.js";
import Addpatient from "../../Components/Addpatient/Addpatient";
import { CgLogOut } from "react-icons/cg";
import { Logout } from "../../Components/Logout/Logout";
import HospitalInfo from "../../Components/PublicDash/Info/HospitalStats";
import PatientLogin from "../../Components/PublicDash/PatientLogin";
import StaffLogin from "../../Components/PublicDash/Staff";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext } from "react";
import { ThemeContext } from "../../Components/RUCApi/ThemeContext";
import CoolBg from "../../Components/RUCApi/CoolBg";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Home() {
  const theme = useTheme();

  const [value, setValue] = React.useState("info");
  const { mode, toggleTheme } = useContext(ThemeContext);

  const handleChange = (event, newValue) => {
    if (newValue === "mode") {
      toggleTheme();
    } else setValue(newValue);
  };

  const styles = React.useMemo(() => getComputedStyle(theme), [mode]);

  return (
    <Grid
      container
      spacing={0}
      sx={{
        height: "auto",
        maxWidth: "100vw",

        backgroundColor: theme.palette.v2.light,
        position: "relative",
        '& .coolBg': {
          position: "fixed",
          top: "0px",
          right: "-25px",
          ' & path': {
            fillOpacity: "0.03"
          }
        },

      }}
    >
      <CoolBg />

      <Grid item xs={1.1} style={styles.gridItem1}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          indicatorColor="primary"
          sx={styles.tabs}
        >
          <Tab
            value={"info"}
            sx={styles.tab}
            iconPosition="top"
            icon={<MdSpaceDashboard size="2rem" />}
            label="Info"
            {...a11yProps("info")}
          />
          <Tab
            value={"patient"}
            sx={styles.tab}
            iconPosition="top"
            icon={<BsCalendarPlusFill size="2rem" />}
            label="Patient"
            {...a11yProps("patient")}
          />
          <Tab
            value={"staff"}
            sx={styles.tab}
            iconPosition="top"
            icon={<CgProfile size="2rem" />}
            label="Staff"
            {...a11yProps("staff")}
          />
          <Tab
            value={"mode"}
            sx={styles.tab}
            iconPosition="top"
            icon={mode === "light" ? <DarkModeIcon /> : <Brightness7Icon />}
            label={mode === "light" ? "dark" : "light"}
            {...a11yProps("mode")}
          />
        </Tabs>
      </Grid>
      <Grid
        item
        xs={10.9}
        sx={{
          height: "auto !important",

        }}
      >

        <TabPanel value={value} index={"info"}>
          <RightSection />
        </TabPanel>
        <TabPanel value={value} index={"patient"}>
          <PatientLogin />
        </TabPanel>
        <TabPanel value={value} index={"staff"}>
          <StaffLogin />
        </TabPanel>
      </Grid>

    </Grid>
  );
}
