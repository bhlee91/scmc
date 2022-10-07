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
import cargoSlice from 'src/slice/cargo';
import cargoImageSlice from 'src/slice/cargoImage';

import { Link, useSearchParams, useNavigate } from "react-router-dom";
import store from "src/store";

const theme = createTheme();

const Camera = () => {
  const imageList = store.getState().cargo.imageList

  const [ params ] = useSearchParams();
  const navigate = useNavigate();
  
  const dispatch = useAppDispatch();
  const [takePicture, setTakePicture] = React.useState("");
  const [picLoad, setPicload] = React.useState(false);

  const [fileImage, setFileImage] = React.useState([])
  const [previewFile, setPreviewFile] = React.useState([
    ...imageList.map(image => image.contents)
  ])

  const handleTakePhoto = (dataUri) => {
    // Do stuff with the photo...
    console.log(dataUri);
    setTakePicture(dataUri);
    setPicload(true);
  }

  const handleReset = () => {
    setPicload(false);
  }

  const getBase64 = (file, index) => {
    return new Promise((resolve, reject) => {
      let baseURL = ""
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        baseURL = reader.result
        dispatch(
          cargoImageSlice.actions.SET_IMAGE({
            seq: index,
            contents: baseURL,
            memDiv: "M01",
          })
        )

        resolve()
      }
      reader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const handleFileInputChange = () => {

    Promise.all(
      Array.from(fileImage).map((file, index) => 
        getBase64(file, index)
      )
    )
    .then(() => {
      dispatch(
        cargoSlice.actions.SET_IMAGE(
          store.getState().cargoImage
        )
      )
    })
    .then(() => {
      navigate(`/ShipperRequire?stepIndex=${params.get("stepIndex")}`, { replace: true })
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleInputChange = event => {
    setFileImage(event.target.files)

    let fileURLList = []

    for (let i = 0; i < event.target.files.length; i++) {
      let fileURL = URL.createObjectURL(event.target.files.item(i))
      fileURLList.push(fileURL)
    }

    setPreviewFile(fileURLList)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* app bar component */}
      <Appbar />

      <input type="file" multiple={true} onChange={handleInputChange}></input>
      <div>
        {
          previewFile.map((file, index) => <img key={index} style={{ width: 250, height: 250 }} alt="imageSample" src={file} />)
        }
      </div>

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
          <Button type="file" variant="contained" onClick={handleFileInputChange}>등록</Button>
          <Button variant="contained" onClick={handleReset}>
            다시찍기
          </Button>
          <Button variant="contained" component={Link} to={`/ShipperRequire?stepIndex=${params.get("stepIndex")}`} >
            이전
          </Button>
        </Stack>
      </Box>
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}
export default Camera;
