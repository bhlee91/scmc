/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import * as React from "react";

import { useLocation } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "pages/LayoutContainers/DashboardLayout";
import DashboardNavbar from "pages/Navbars/DashboardNavbar";
import Footer from "pages/Footer";
import ReportsBarChart from "pages/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "pages/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "pages/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";

import { useSnackbar } from "notistack";

import {
  getDashboardInfo
} from "api/system/index";
import { formatFare } from "utils/commonUtils";

const Dashboard = () => {
  const location = useLocation()
  const { enqueueSnackbar } = useSnackbar()

  const [ salesData, setSalesData] = React.useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "Mobile apps", data: [] },
  })
  const [ tasksData, setTasksData ] = React.useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "Desktop apps", data: [] },
  })

  const [ dashboardInfo, setDashboardInfo ] = React.useState({
    count_by_month: [],
    request_count: 0,
    tf_count: 0,
    truckowner_count: 0
  })

  React.useEffect(() => {
    if (location.state !== null && location.state !== undefined) {
      enqueueSnackbar(location.state.msg, {
        variant: location.state.variant
      })
    }

    getDashboardInfo()
    .then(res => {
      const temp_request = res.data.temp_request
      const temp_complete = res.data.temp_complete

      setSalesData(prevState => ({
        ...prevState,
        datasets: {
          data: temp_request
        }
      }))
      setTasksData(prevState => ({
        ...prevState,
        datasets: {
          data: temp_complete
        }
      }))
      setDashboardInfo({ ...res.data })
    })
    .then(() => {
      window.history.replaceState({}, null)
    })

  }, [])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="화물운송완료"
                count={formatFare(dashboardInfo.tf_count)}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "tb_fare_temp count",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="person_add"
                title="차주수"
                count={dashboardInfo.truckowner_count}
                percentage={{
                  color: "success",
                  amount: "+0%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="화물등록수"
                count={formatFare(dashboardInfo.request_count)}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "tb_fare_temp2 count",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="차주 가입건수"
                  description="차주가입 수"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="화물 등록 수"
                  description={
                    <>
                      (<strong>+15%</strong>) 오늘 화물 등록
                    </>
                  }
                  date="updated 4 min ago"
                  chart={salesData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="월별 배송건수"
                  description="월별 화물 배송완료건수(tb_fare_temp 테이블 사용)"
                  date="just updated"
                  chart={tasksData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          {/* <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <Projects />
            </Grid>
          </Grid> */}
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
