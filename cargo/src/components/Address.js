import * as React from "react";
import Footer from "src/common/Footer";
import Appbar from "src/common/Appbar";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, createTheme, Divider, ThemeProvider } from "@mui/material";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSearchParams, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import store, { useAppDispatch } from 'src/store';
import cargoSlice from "src/slice/cargo";
import {
  searchAddress
} from "src/api/cargo";

import Modal from "src/common/Modal";

const theme = createTheme();

const Address = () => {
  const cargo = store.getState().cargo
  const dispatch = useAppDispatch()
  const [ params ] = useSearchParams()
  const navigate = useNavigate()

  const [isDepartOpen, setIsDepartOpen] = React.useState(false)
  const [isArrivalOpen, setIsArrivalOpen] = React.useState(false)
  const [departAddrSt, setDepartAddrSt] = React.useState(cargo.departAddrSt)
  const [departAddrOld, setDepartAddrOld] = React.useState(cargo.departAddrOld)
  const [arrivalAddrSt, setArrivalAddrSt] = React.useState(cargo.arrivalAddrSt)
  const [arrivalAddrOld, setArrivalAddrOld] = React.useState(cargo.arrivalAddrOld)
  const [departLatitude, setDepartLatitude] = React.useState(cargo.departLatitude)
  const [departLongitude, setDepartLongitude] = React.useState(cargo.departLongitude)
  const [arrivalLatitude, setArrivalLatitude] = React.useState(cargo.arrivalLatitude)
  const [arrivalLongitude, setArrivalLongitude] = React.useState(cargo.arrivalLongitude)

  const [showDepartAddr, setShowDepartAddr] = React.useState(
    departAddrSt + "\n(지번) " + departAddrOld
  )
  const [showArrivalAddr, setShowArrivalAddr] = React.useState(
    arrivalAddrSt + "\n(지번) " + arrivalAddrOld
  )

  const handleDepartSearchComplete = (data) => {

    searchAddress(data.roadAddress)
    .then(res => {
      /*
      x: 경도(longitude)
      y: 위도(latitude)
      */
      return res.data.documents[0]
    })
    .then((res) => {
      setIsDepartOpen(false)
      setDepartAddrSt(data.roadAddress)
      setDepartAddrOld(data.jibunAddress)
      setDepartLatitude(res.y)
      setDepartLongitude(res.x)

      setShowDepartAddr(data.roadAddress + "\n(지번) " + data.jibunAddress)
    })
  }

  const handleArrivalSearchComplete = (data) => {

    searchAddress(data.roadAddress)
    .then(res => {
      /*
      x: 경도(longitude)
      y: 위도(latitude)
      */
      return res.data.documents[0]
    })
    .then((res) => {
      setIsArrivalOpen(false)
      setArrivalAddrSt(data.roadAddress)
      setArrivalAddrOld(data.jibunAddress)
      setArrivalLatitude(res.y)
      setArrivalLongitude(res.x)

      setShowArrivalAddr(data.roadAddress + "\n(지번) " + data.jibunAddress)
    })
    
  }

  const handleDepartSearchActive = (active) => {
    setIsDepartOpen(active)
  }

  const handleArrivalSearchActive = (active) => {
    setIsArrivalOpen(active)
  }

  const handleChangePage = () => {
    dispatch(
      cargoSlice.actions.SET_REQUEST_4({
        departAddrSt: departAddrSt,
        departAddrOld: departAddrOld,
        arrivalAddrSt: arrivalAddrSt,
        arrivalAddrOld: arrivalAddrOld,
        departLatitude: departLatitude,
        departLongitude: departLongitude,
        arrivalLatitude: arrivalLatitude,
        arrivalLongitude: arrivalLongitude,
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
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 200,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="출발지 주소"
              inputProps={{ "aria-label": "search google maps" }}
              onClick={() => handleDepartSearchActive(true)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={() => handleDepartSearchActive(true)}>
              <SearchIcon />
            </IconButton>
            <Modal isOpen={isDepartOpen} onClose={() => handleDepartSearchActive(false)} onComplete={handleDepartSearchComplete} header="출발지 주소 찾기"></Modal>
          </Paper>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              inputProps={{ "aria-label": "search google maps" }}
              multiline={true}
              value={showDepartAddr}
            />
          </Paper>
        </Grid>
      </Container>
      <Container sx={{ py: 2 }} maxWidth="md">
        {/* End hero unit */}

        <Grid container spacing={1} justifyContent="center">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 200,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="도착지 주소"
              inputProps={{ "aria-label": "search google maps" }}
              onClick={() => handleArrivalSearchActive(true)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={() => handleArrivalSearchActive(true)}>
              <SearchIcon />
            </IconButton>
            <Modal isOpen={isArrivalOpen} onClose={() => handleArrivalSearchActive(false)} onComplete={handleArrivalSearchComplete} header="도착지 주소 찾기"></Modal>
          </Paper>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              inputProps={{ "aria-label": "search google maps" }}
              multiline={true}
              value={showArrivalAddr}
            />
          </Paper>
        </Grid>
      </Container>

      <Divider />
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <Typography variant="body1" display="block" textAlign="center">
          입력하신 위치정보를 등록하시겠습니까? <br /> 이전단계로 이전 시
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
export default Address;
