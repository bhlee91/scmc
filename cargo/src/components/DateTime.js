import * as React from "react";
import Footer from "../common/Footer";
import Appbar from "../common/Appbar";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, createTheme, Divider, ThemeProvider } from "@mui/material";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSearchParams, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import store, { useAppDispatch } from 'src/store';
import cargoSlice from "src/slice/cargo";

const theme = createTheme();

const DateTime = () => {
  const cargo = store.getState().cargo
  const dispatch = useAppDispatch();
  const [ params ] = useSearchParams();
  const navigate = useNavigate();

  const [depart, setDepart] = React.useState(cargo.departDatetimes.replace(" ", "T"));
  const [arrival, setArrival] = React.useState(cargo.arrivalDatetimes.replace(" ", "T"));

  const handleDepartChange = (event) => {
    console.log(depart)
    setDepart(event.target.value)
  }

  const handleArrivalChange = (event) => {
    console.log(arrival)
    setArrival(event.target.value)
  };

  const handleChangePage = () => {
    dispatch(
      cargoSlice.actions.SET_REQUEST_3({
        departDatetimes: depart.replace("T", " "),
        arrivalDatetimes: arrival.replace("T", " ")
      })
    )

    navigate(`/ShipperRequire?stepIndex=${params.get("stepIndex")}`)
  }

  const handleCancelPage = () => {
    navigate(`/ShipperRequire?stepIndex=${params.get("stepIndex")}`)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* app bar component */}
      <Appbar />

      <ImageList sx={{ width: 500, height: 250 }} variant="woven" cols={1}>
        <ImageListItem>
          <img src="./image/6.jpg" alt="가로세로" loading="lazy" />
        </ImageListItem>
      </ImageList>
      <Divider />

      <Container sx={{ py: 2 }} maxWidth="md">
        {/* End hero unit */}

        <Grid container spacing={1} justifyContent="center">
          {/* 출발 날짜  */}
          <Grid item xs={12} sm={3} md={4} container justifyContent="center">
            <Stack component="form" noValidate spacing={3}>
              <TextField
                id="start-date"
                label="출발날짜 및 시간"
                type="datetime-local"
                value={depart}
                onChange={handleDepartChange}
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ py: 2 }} maxWidth="md">
        {/* End hero unit */}

        <Grid container spacing={1}>
          {/* 출발 날짜  */}
          <Grid item xs={12} sm={3} md={4} container justifyContent="center">
            <Stack component="form" noValidate spacing={3}>
              <TextField
                id="arival-date"
                label="도착날짜 및 시간"
                type="datetime-local"
                inputformat="yyyy-MM-dd HH:mm:ss"
                value={arrival}
                onChange={handleArrivalChange}
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Divider />
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <Typography variant="body1" display="block" textAlign="center">
          입력하신 시간정보를 등록하시겠습니까? <br /> 이전단계로 이전 시
          입력하신 값들은 초기화 됩니다.
        </Typography>

        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <div></div>
          <Button variant="contained" onClick={handleChangePage}>등록</Button>

          <Button variant="contained" onClick={handleCancelPage}>이전</Button>
        </Stack>
      </Box>
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}
export default DateTime;
