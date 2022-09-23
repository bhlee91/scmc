import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { useSnackbar } from "notistack";

import {
  login
} from "api/system/admin";
import { useAppDispatch } from 'store';
import userSlice from "slice/user";

const Basic = () => {
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSearchChange = (prop) => (event) => {
    setUser({ ...user, [prop]: event.target.value })
  }

  const handleLogin = () => {
    if (user.email === "") {
      enqueueSnackbar("이메일을 입력해주세요", {
        variant: "info"
      })
      return
    }

    if (user.password === "") {
      enqueueSnackbar("비밀번호를 입력해주세요", {
        variant: "info"
      })
      return
    }

    login(user)
    .then((res) => {
      const login = res.data

      if (login.data !== null) {
        dispatch(
          userSlice.actions.SET_LOGIN({
            email: res.data.data.email
          })
        )
      }

      enqueueSnackbar(res.data.msg, {
        variant: "success",

      })
      location.replace("/")
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") handleLogin();
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            로그인
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" value={user.email} fullWidth onChange={handleSearchChange("email")} onKeyPress={handleKeyPress} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" value={user.password} fullWidth onChange={handleSearchChange("password")} onKeyPress={handleKeyPress} />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleLogin}>
                로그인
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                계정이 없으시면?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  회원가입
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography
                component={Link}
                to="/dashboard"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                홈으로
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
