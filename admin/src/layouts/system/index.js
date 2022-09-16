import * as React from "react";

import DashboardLayout from "pages/LayoutContainers/DashboardLayout";
import DashboardNavbar from "pages/Navbars/DashboardNavbar";
import Footer from "pages/Footer";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import Stack from "@mui/material/Stack";

import { Card, CardContent, CardActionArea } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import Icon from "@mui/material/Icon";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Vermgmt from "./vermgmt";
import Paymgmt from "./paymgmt";
import Stomgmt from "./stomgmt";
import Terms from "./terms";
import Banner from "./banner";

function System() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <TabList
              sx={{
                backgroundColor: "success.main",
                "&:hover": {
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              onChange={handleChange}
            >
              <Tab label="버전관리" value="1" />
              <Tab label="이용료설정" value="2" />
              <Tab label="적재함정보" value="3" />
              <Tab label="약관관리" value="4" />
              <Tab label="배너관리" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Vermgmt />
          </TabPanel>
          <TabPanel value="2">
            <Paymgmt />
          </TabPanel>
          <TabPanel value="3">
            <Stomgmt />
          </TabPanel>
          <TabPanel value="4">
            <Terms />
          </TabPanel>
          <TabPanel value="5">
            <Banner />
          </TabPanel>
        </TabContext>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default System;
