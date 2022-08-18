import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  CardContent,
  Divider,
  ImageList,
  Link,
  Paper,
} from "@mui/material";
import Footer from "./common/Footer";
import Appbar from "./common/Appbar";
import BottomNavigation from "./common/BottomNavigation";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import InfoIcon from "@mui/icons-material/Info";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

import store from './store';

const theme = createTheme();

const settings = {
  className: "slider variable-width",

  dots: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  cssEase: "linear",
};

const cols = 1;
const rows = 1;

function Main() {
  const navigate = useNavigate();

  console.log(store.getState())

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* app bar component */}
      <Appbar />
      <main>
        {/* Hero unit */}
        <Container sx={{ py: 5 }} maxWidth="md">
          <Grid>
            <div>
              <Slider {...settings}>
                <div style={{ width: 100 }}>
                  <img width="100%" src="./image/1.jpg" alt="1" />
                </div>
                <div>
                  <img width="100%" src="./image/2.jpg" alt="1" />
                </div>
                <div>
                  <img width="100%" src="/image/3.jpg" alt="3" />
                </div>
              </Slider>
            </div>
          </Grid>
        </Container>

        <Container sx={{ py: 3 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={1}>
            {/* 화물의뢰하기 */}
            <Grid item xs={12} sm={3} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid>
                      {/* 상차지 이미지  */}
                      <Link onClick={() => navigate("/ShipperRequire")}>
                        <ImageList sx={{ width: 800, height: 250 }}>
                          <ImageListItem cols={cols} rows={rows}>
                            <img
                              width="100%"
                              src="./image/5.jpg?fit=crop&auto=format"
                              // srcSet="./image/6.jpg?w=400&fit=crop&auto=format&dpr=1 1x"
                              alt="화물의뢰하기"
                              loading="lazy"
                            />
                            <ImageListItemBar
                              title="화물의뢰하기"
                              actionIcon={
                                <IconButton
                                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                                  aria-label={`info about 화물의뢰하기`}
                                ></IconButton>
                              }
                            />
                          </ImageListItem>
                        </ImageList>
                      </Link>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* 이용내역보기 */}
            <Grid item xs={12} sm={3} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid>
                      {/* 상차지 이미지  */}
                      <Link onClick={() => navigate("/UseList")}>
                        <ImageList sx={{ width: 800, height: 250 }}>
                          <ImageListItem cols={cols} rows={rows}>
                            <img
                              width="100%"
                              src="./image/7.jpg"
                              // srcSet="./image/6.jpg?w=400&fit=crop&auto=format&dpr=1 1x"
                              alt="이용내역보기"
                              loading="lazy"
                            />
                            <ImageListItemBar
                              title="이용내역보기"
                              actionIcon={
                                <IconButton
                                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                                  aria-label={`info about 이용내역보기`}
                                ></IconButton>
                              }
                            />
                          </ImageListItem>
                        </ImageList>
                      </Link>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            {/* 고객센터 */}
            <Grid item xs={12} sm={3} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid>
                      {/* 상차지 이미지  */}
                      <Link onClick={() => navigate("/Customer")}>
                        <ImageList sx={{ width: 800, height: 250 }}>
                          <ImageListItem cols={cols} rows={rows}>
                            <img
                              width="100%"
                              src="./image/6.jpg"
                              // srcSet="./image/6.jpg?w=400&fit=crop&auto=format&dpr=1 1x"
                              alt="고객센터"
                              loading="lazy"
                            />
                            <ImageListItemBar
                              title="고객센터"
                              actionIcon={
                                <IconButton
                                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                                  aria-label={`info about 고객센터`}
                                ></IconButton>
                              }
                            />
                          </ImageListItem>
                        </ImageList>
                      </Link>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
      <Divider />
      {/* Footer */}
      <Footer />
      {/* End footer */}
      {/* <BottomNavigation /> */}
    </ThemeProvider>
  );
}

export default Main;
