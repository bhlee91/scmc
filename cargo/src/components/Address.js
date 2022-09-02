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
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import { useAppDispatch } from 'src/store';
import cargoSlice from "src/slice/cargo";

import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";

const theme = createTheme();

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    left: "0",
    margin: "auto",
    width: "350px",
    height: "400px",
    padding: "0",
    overflow: "hidden",
  }
}

const Address = () => {
  const dispatch = useAppDispatch();
  const [ params ] = useSearchParams();
  const navigate = useNavigate();

  const [isDepartOpen, setIsDepartOpen] = React.useState(false)
  const [isArrivalOpen, setIsArrivalOpen] = React.useState(false)
  const [departAddrSt, setDepartAddrSt] = React.useState("")
  const [departAddrOld, setDepartAddrOld] = React.useState("")
  const [arrivalAddrSt, setArrivalAddrSt] = React.useState("")
  const [arrivalAddrOld, setArrivalAddrOld] = React.useState("")

  const [showDepartAddr, setShowDepartAddr] = React.useState("")
  const [showArrivalAddr, setShowArrivalAddr] = React.useState("")

  const handleDepartSearchComplete = (data) => {
    setIsDepartOpen(false)
    setDepartAddrSt(data.roadAddress)
    setDepartAddrOld(data.jibunAddress)

    setShowDepartAddr(data.roadAddress + "\n(지번) " + data.jibunAddress)
  }

  const handleArrivalSearchComplete = (data) => {
    setIsArrivalOpen(false)
    setArrivalAddrSt(data.roadAddress)
    setArrivalAddrOld(data.jibunAddress)

    setShowArrivalAddr(data.roadAddress + "\n(지번) " + data.jibunAddress)
  }

  const handleDepartSearchOpen = () => {
    setIsDepartOpen(!isDepartOpen)
  }

  const handleArrivalSearchOpen = () => {
    setIsArrivalOpen(!isArrivalOpen)
  }

  const handleChangePage = () => {
    dispatch(
      cargoSlice.actions.SET_REQUEST_4({
        departAddrSt: departAddrSt,
        departAddrOld: departAddrOld,
        arrivalAddrSt: arrivalAddrSt,
        arrivalAddrOld: arrivalAddrOld
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
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={handleDepartSearchOpen}>
              <SearchIcon />
            </IconButton>
            <Modal isOpen={isDepartOpen} ariaHideApp={false} style={customStyles}>
              <DaumPostcode onComplete={handleDepartSearchComplete} />
            </Modal>
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
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={handleArrivalSearchOpen}>
              <SearchIcon />
            </IconButton>
            <Modal isOpen={isArrivalOpen} ariaHideApp={false} style={customStyles}>
              <DaumPostcode onComplete={handleArrivalSearchComplete} />
            </Modal>
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
