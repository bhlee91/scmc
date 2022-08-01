import * as React from "react";
import { useState, useCallback } from "react";
import Footer from "../common/Footer";
import Appbar from "../common/Appbar";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Container,
  createTheme,
  Paper,
  ThemeProvider,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
  Box,
  Divider,
  Chip,
  CardHeader,
  Collapse,
} from "@mui/material";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { render } from "react-dom";
import ImageViewer from "react-simple-image-viewer";

const theme = createTheme();

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const cols = 1;
const rows = 1;

function UseList() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#ECEFF1",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // 상세보기 처리
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //  이미지 처리
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [
    "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
  ];

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* app bar component */}
      <Appbar />

      {/* 상단 이미지 */}
      <Container sx={{ py: 1 }} maxWidth="md">
        {/* 모달 이미지  */}

        {/* End hero unit */}
        <Grid item xs={12} sm={3} md={4}>
          <Grid container spacing={1}>
            <Grid>
              <ImageList sx={{ width: 800, height: 250 }}>
                <ImageListItem cols={cols} rows={rows}>
                  <img
                    width="100%"
                    src="./image/5.jpg"
                    // srcSet="./image/6.jpg?w=400&fit=crop&auto=format&dpr=1 1x"
                    alt="이용내역"
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title="이용내역"
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about 이용내역`}
                      ></IconButton>
                    }
                  />
                </ImageListItem>
              </ImageList>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* 상단 이미지 끝*/}

      <Container sx={{ py: 2 }} maxWidth="md">
        <Stack spacing={1}>
          <Item>1. 현재 진행중인 운송내역</Item>
        </Stack>
      </Container>

      <Container sx={{ py: 1 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={1} item xs={12} sm={3} md={4}>
          {/* 이용내역보기 */}
          <Card
            sx={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Grid container spacing={1} item xs={12} sm={3} md={4}>
                <Grid item xs={6}>
                  <Stack sx={{ py: 1 }} direction="row" spacing={1}>
                    <Chip label="최적차량검색중" color="success" />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    m={1}
                    display="flex"
                    justifyContent="right"
                    alignItems="center"
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      color="info"
                      sx={{ height: 40 }}
                      href="/"
                    >
                      취소하기
                    </Button>
                  </Box>
                </Grid>
              </Grid>

              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                상차지 : 서울특별시 강남구 테헤란로 1
              </Typography>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" /> 시간 : 2022년 5월 11일 11시
                00분
              </Typography>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                하차지 : 서울특별시 강남구 테헤란로 1
              </Typography>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                시간 : 2022년 5월 11일 11시 00분
              </Typography>
            </CardContent>

            <CardActions disableSpacing>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="상세보기"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>

            {/* 상세보기 */}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={3} md={4}>
                    <ThemeProvider theme={theme}>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "background.default",
                          display: "grid",
                          gridTemplateColumns: { md: "1fr 1fr" },
                          gap: 2,
                        }}
                      >
                        <Item>화물정보</Item>
                        <Typography>크기 : XX M XX M XX</Typography>
                        <Typography>중량 : XX Kg</Typography>
                        <Typography>체적 : XX M3</Typography>
                      </Box>
                    </ThemeProvider>

                    {/* 화주 이미지  */}
                    <ImageList sx={{ width: 400, height: 200 }}>
                      {images.map((src, index) => (
                        <img
                          src={src}
                          onClick={() => openImageViewer(index)}
                          width="200"
                          key={index}
                          style={{ margin: "1px" }}
                          alt=""
                        />
                      ))}

                      {isViewerOpen && (
                        <ImageViewer
                          src={images}
                          currentIndex={currentImage}
                          onClose={closeImageViewer}
                          disableScroll={false}
                          backgroundStyle={{
                            backgroundColor: "rgba(0,0,0,0.9)",
                          }}
                          closeOnClickOutside={true}
                        />
                      )}
                    </ImageList>
                  </Grid>
                </Grid>
              </CardContent>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={3} md={4}>
                    <ThemeProvider theme={theme}>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "background.default",
                          display: "grid",
                          gridTemplateColumns: { md: "1fr 1fr" },
                          gap: 2,
                        }}
                      >
                        <Item>상차지</Item>
                        <Typography>
                          상차지 : 서울특별시 강남구 테헤란로 1
                        </Typography>
                        <Typography>
                          시간 : 2022년 5월 11일 11시 00분
                        </Typography>
                      </Box>
                    </ThemeProvider>

                    {/* 상차지 이미지  */}
                    <ImageList sx={{ width: 400, height: 200 }}>
                      {images.map((src, index) => (
                        <img
                          src={src}
                          onClick={() => openImageViewer(index)}
                          width="200"
                          key={index}
                          style={{ margin: "2px" }}
                          alt=""
                        />
                      ))}

                      {isViewerOpen && (
                        <ImageViewer
                          src={images}
                          currentIndex={currentImage}
                          onClose={closeImageViewer}
                          disableScroll={false}
                          backgroundStyle={{
                            backgroundColor: "rgba(0,0,0,0.9)",
                          }}
                          closeOnClickOutside={true}
                        />
                      )}
                    </ImageList>
                  </Grid>
                </Grid>
              </CardContent>
              {/* 하차지  */}
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={3} md={4}>
                    <ThemeProvider theme={theme}>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "background.default",
                          display: "grid",
                          gridTemplateColumns: { md: "1fr 1fr" },
                          gap: 2,
                        }}
                      >
                        <Item>하차지</Item>
                        <Typography>
                          하차지 : 서울특별시 강남구 테헤란로 1
                        </Typography>
                        <Typography>
                          시간 : 2022년 5월 11일 11시 00분
                        </Typography>
                      </Box>
                    </ThemeProvider>

                    {/* 하차지 이미지  */}
                    <ImageList sx={{ width: 400, height: 200 }}>
                      {images.map((src, index) => (
                        <img
                          src={src}
                          onClick={() => openImageViewer(index)}
                          width="200"
                          key={index}
                          style={{ margin: "2px" }}
                          alt=""
                        />
                      ))}

                      {isViewerOpen && (
                        <ImageViewer
                          src={images}
                          currentIndex={currentImage}
                          onClose={closeImageViewer}
                          disableScroll={false}
                          backgroundStyle={{
                            backgroundColor: "rgba(0,0,0,0.9)",
                          }}
                          closeOnClickOutside={true}
                        />
                      )}
                    </ImageList>
                  </Grid>
                </Grid>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Container>

      <Container sx={{ py: 2 }} maxWidth="md">
        <Stack spacing={1}>
          <Item>2. 이전 운송내역</Item>
        </Stack>
      </Container>

      <Container sx={{ py: 1 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={1}>
          {/* 이용내역보기 */}
          <Card
            sx={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Stack sx={{ py: 1 }} direction="row" spacing={1}>
                <Chip label="운송완료" color="success" />
              </Stack>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                상차지 : 서울특별시 강남구 테헤란로 1
              </Typography>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                시간 : 2022년 5월 11일 11시 00분
              </Typography>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                하차지 : 서울특별시 강남구 테헤란로 1
              </Typography>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                시간 : 2022년 5월 11일 11시 00분
              </Typography>
            </CardContent>

            {/* <CardMedia
              component="img"
              sx={{ width: 100 }}
              image="/static/images/cards/live-from-space.jpg"
              alt="매칭완료"
            /> */}
          </Card>
        </Grid>
      </Container>
      <Container sx={{ py: 1 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={1}>
          {/* 이용내역보기 */}
          <Card
            sx={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Stack sx={{ py: 1 }} direction="row" spacing={1}>
                <Chip label="운송취소" color="error" />
              </Stack>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                상차지 : 서울특별시 강남구 테헤란로 1
              </Typography>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                시간 : 2022년 5월 11일 11시 00분
              </Typography>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                하차지 : 서울특별시 강남구 테헤란로 1
              </Typography>
              <Divider />
              <Typography gutterBottom variant="body2" component="div">
                <ArrowRightIcon color="primary" />
                시간 : 2022년 5월 11일 11시 00분
              </Typography>
            </CardContent>

            {/* <CardMedia
              component="img"
              sx={{ width: 100 }}
              image="/static/images/cards/live-from-space.jpg"
              alt="매칭완료"
            /> */}
          </Card>
        </Grid>
      </Container>
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}
export default UseList;
