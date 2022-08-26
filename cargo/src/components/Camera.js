import * as React from "react";
import Footer from "../common/Footer";
import Appbar from "../common/Appbar";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Container,
  createTheme,
  Divider,
  Stack,
  ThemeProvider,
} from "@mui/material";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CameraLib from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

import { useAppDispatch } from 'src/store';
import cargoImageSlice from 'src/slice/cargoImage';

const theme = createTheme();

const Camera = () => {
  const dispatch = useAppDispatch();
  const [takePicture, setTakePicture] = React.useState("");
  const [picLoad, setPicload] = React.useState(false);
  const [seq, setSeq] = React.useState(0);

  const handleTakePhoto = (dataUri) => {
    // Do stuff with the photo...
    console.log(dataUri);
    setTakePicture(dataUri);
    setPicload(true);
  }

  const handleReset = () => {
    setPicload(false);
  }

  const getBase64 = (file) => {
    return new Promise(res => {
      let baseURL = ""
      let reader = new FileReader();
  
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        baseURL = reader.result
        res(baseURL)
      }
    })
  }

  const handleFileInputChange = event => {
    const file = event.target.files[0]

    getBase64(file)
    .then(res => {
      dispatch(
        cargoImageSlice.actions.SET_IMAGE({
          seq: seq,
          content: res
        })
      )

      setSeq((value) => value++)
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* app bar component */}
      <Appbar />

      <Container sx={{ py: 3 }} maxWidth="md">
        {/* End hero unit */}
        <CameraLib
          onTakePhoto={(dataUri) => {
            handleTakePhoto(dataUri);
          }}
        />
        {picLoad ? (
          <Grid container spacing={1}>
            {/* 카메라 이미지 */}
            <Grid item xs={12} sm={3} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={takePicture}
                  alt="카메라 이미지"
                />
              </Card>
            </Grid>
          </Grid>
        ) : null}
      </Container>
      <Divider />
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <Typography variant="body1" display="block" textAlign="center">
          위 사진을 등록 하시겠습니까?
        </Typography>

        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <div></div>
          <Button variant="contained" onClick={handleFileInputChange}>등록</Button>
          <Button variant="contained" onClick={handleReset}>
            다시찍기
          </Button>
        </Stack>
      </Box>
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}
export default Camera;
