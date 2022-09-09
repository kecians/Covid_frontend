// import React from 'react'

import Footer from "../../Components/Footer/Footer";
import Nursehome from "../../Components/Nursehome/Nursehome";
import Grid from "@mui/material/Grid";
// export default function Info() {
//     return (
//         <>
//         <div className="container-fluid bg-silver">
//             <Nursehome />
//         </div>
//         <div className="container-fluid p-0 m-0">
//             <Footer />
//         </div>
//         </>
//     )
// }

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TabPanel from "../../Components/Dashboard/Info/TabPanel";
import RightSection from "../../Components/Dashboard/RightSection";
import {MdSpaceDashboard} from "react-icons/md";
import {BsCalendarPlusFill} from "react-icons/bs";
import {CgProfile} from 'react-icons/cg';
import {FaClipboardList} from 'react-icons/fa';
import {TbHeartRateMonitor} from 'react-icons/tb';
import Searchbar from "../../Components/Searchbar/Searchbar";
import PatientList from "../../Components/Dashboard/PatientList";


function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
    sx : {margin : "10px 2px"}
  };
}

export default function Info() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 

  return (
   
      <Grid container spacing={2} 
        sx={{
          height: "auto",
          width: "100vw",
          minHeight : "100vh"
        }}
      >
        <Grid item xs={1} 
        
        style = {{
        background : "white",
        position : "sticky",
        top : '0px',
        height : "100vh"
        }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            indicatorColor  = "none"
            sx={{
              borderColor: "divider",
              height : "auto",
              marginTop : "100px",
            }}
            TabIndicatorProps = {{
                style : {
                }
            }}
          
          >
            <Tab  icon= {<MdSpaceDashboard size = "24px" />}  {...a11yProps(0)} />
            <Tab icon= {<BsCalendarPlusFill  size = "24px" />} {...a11yProps(1)} />
            <Tab icon= {<CgProfile  size = "24px" />} {...a11yProps(2)} />
            <Tab icon= {<FaClipboardList  size = "24px" />} {...a11yProps(3)} />
            <Tab icon= {   <TbHeartRateMonitor  size = "24px" />} {...a11yProps(4)} />
            
          </Tabs>
        </Grid>
        <Grid item xs={11} 
             sx = {{
                height : "auto !important"
             }}
            >
          <TabPanel value={value} index={0}>
            <RightSection />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
           <PatientList />
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>
          <TabPanel value={value} index={4}>
            Item Five
          </TabPanel>
          <TabPanel value={value} index={5}>
            Item Six
          </TabPanel>
          <TabPanel value={value} index={6}>
            Item Seven
          </TabPanel>
        </Grid>
      </Grid>
    
  );
}
