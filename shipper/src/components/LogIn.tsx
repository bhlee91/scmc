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
import Footer from "../common/Footer";
import Appbar from "../common/Appbar";

import { 
  initNaverLogin,
  initKaKaoLogin
} from '../api/member/auth';

function Copyright(props: any) {
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

export default function LogIn() {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleNaverLogin = () => {
    initNaverLogin()
    .then(res => {
      window.location.href = res.data
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleKaKaoLogin = () => {
    initKaKaoLogin()
    .then(res => {
      console.log(res)
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
            ?????????
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
              label="?????????"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="????????????"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="???????????????"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ?????????
            </Button>
            <div onClick={handleNaverLogin}>
              <img
                src="http://static.nid.naver.com/oauth/small_g_in.PNG"
                alt="????????? ????????? ??????"
                style={{ height: 45 }}
              />
            </div>
            <div onClick={handleKaKaoLogin}>
              <img
                src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                alt="????????? ????????? ??????"
              />
            </div>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ???????????? ??????
                </Link>
              </Grid>
              <Grid item>
                <Link href="/MemberReg" variant="body2">
                  {"????????????"}
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
