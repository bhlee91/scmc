import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "src/common/Footer";
import Appbar from "src/common/Appbar";

import { 
  initNaverLogin,
  initKaKaoLogin,
  adminLogin
} from 'src/api/member/auth';

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    ></Typography>
  );
}

const theme = createTheme();

const LogIn = () => {

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    adminLogin(data.get("email"), data.get("password"))
    .then((res) => {
      if (res.data) {
        window.location.href = "/"
      } else {
        alert("이메일 또는 패스워드를 확인해주세요.")
        return
      }
    })
  }

  const handleNaverLogin = () => {
    initNaverLogin()
    .then(res => {
      window.location.href = res.data
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleKaKaoLogin = () => {
    initKaKaoLogin()
    .then(res => {
      window.location.href = res.data
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Appbar />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="패스워드"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="로그인유지"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            <div onClick={handleNaverLogin}>
              <img
                src="http://static.nid.naver.com/oauth/small_g_in.PNG"
                alt="네이버 로그인 버튼"
                style={{ height: 45 }}
              />
            </div>
            <div onClick={handleKaKaoLogin}>
              <img
                src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                alt="카카오 로그인 버튼"
              />
            </div>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  패스워드 찾기
                </Link>
              </Grid>
              <Grid item>
                <Link href="/MemberReg" variant="body2">
                  {"회원가입"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default LogIn;
