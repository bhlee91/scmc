import React, { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import {
  signup
} from "api/system/admin";

const Cover = () => {
  const [ user, setUser ] = useState({
    email: "",
    password: ""
  })

  const handleSearchChange = (prop) => (event) => {
    setUser({ ...user, [prop]: event.target.value })
  }

  const handleSignUp = () => {

    signup(user)
    .then(res => {
      if (res.data.data === null) {
        alert(`${res.data.msg}`)
        setUser({email: "", password: ""})
        return
      } 
      
      location.href = "/"
      alert(`${res.data.msg}`)
    })
    .catch(err => {
      console.log(err)
      location.href = "/"
    })
  }

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography display="block" variant="button" color="white" my={1}>
            이메일과 패스워드를 입력 하세요
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" value={user.email} fullWidth onChange={handleSearchChange("email")}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" value={user.password} fullWidth onChange={handleSearchChange("password")}/>
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSignUp}>
                회원가입
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                이미 가입되어 있으면 ?{"  "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  로그인
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
