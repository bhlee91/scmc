import * as React from "react";
import Footer from "../common/Footer";
import Appbar from "../common/Appbar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import {
  CardContent,
  Container,
  createTheme,
  Divider,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const theme = createTheme();

function ShipperRequire() {
  //const [open, setOpen] = React.useState(false);

  const handleClick = () => {};
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* app bar component */}
      <Appbar />

      <Container sx={{ py: 8 }} maxWidth="md">
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
              <CardMedia
                component="img"
                height="100"
                image="./image/5.jpg"
                alt="화물의뢰하기"
              />
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* 사진등록 */}
      <Link to="/Camera">
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Button variant="outlined" onClick={handleClick}>
            STEP 1. 사진등록
          </Button>
        </Stack>
      </Link>

      <Container sx={{ py: 8 }} maxWidth="md">
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
              <CardMedia
                component="img"
                height="300"
                image="./image/5.jpg"
                alt="카메라 이미지"
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* 사진등록 */}

      {/* 사이즈 입력 */}
      <div>
        <Link to="/ShipSize">
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Button variant="outlined" onClick={handleClick}>
              STEP 2. 화물사이즈 입력
            </Button>
          </Stack>
        </Link>
      </div>
      <Container sx={{ py: 4 }} maxWidth="md">
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Item>가로 5M</Item>
          <Item>세로 3M</Item>
          <Item>높이 3M</Item>
          <Item>중량 30Kg</Item>
          <Item>체젹 10M3</Item>
        </Stack>
      </Container>

      <div>
        <Link to="/DateTime">
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Button variant="outlined" onClick={handleClick}>
              STEP 3. 출도착 시간 입력
            </Button>
          </Stack>
        </Link>
      </div>
      <Container sx={{ py: 4 }} maxWidth="md">
        <Stack spacing={2}>
          <Item>출발일 : 2022년 5월 22일 15시 35분</Item>
          <Item>도착일 : 2022년 5월 22일 15시 35분</Item>
        </Stack>
      </Container>

      <div>
        <Link to="/Address">
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Button variant="outlined" onClick={handleClick}>
              STEP 4. 출발지/도착지 입력
            </Button>
          </Stack>
        </Link>
      </div>
      <Container sx={{ py: 4 }} maxWidth="md">
        <Stack spacing={2}>
          <Item>출발지 : 서울특별시 강남구 테헤란로 1</Item>
          <Item>도착지 : 서울특별시 강남구 테헤란로 2</Item>
        </Stack>
      </Container>

      <div>
        <Link to="/LoadUnload">
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Button variant="outlined" onClick={handleClick}>
              STEP 5. 상/하차 방법
            </Button>
          </Stack>
        </Link>
      </div>
      <Container sx={{ py: 4 }} maxWidth="md">
        <Stack spacing={2}>
          <Item>상차 방법 : 지게차</Item>
          <Item>하차 방법 : 지게차</Item>
        </Stack>
      </Container>

      <div>
        <Link to="/RequestItem">
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Button variant="outlined" onClick={handleClick}>
              STEP 6. 요청사항
            </Button>
          </Stack>
        </Link>
      </div>
      <Container sx={{ py: 4 }} maxWidth="md">
        <Stack spacing={2}>
          <Item>운송요금 하차지 지불</Item>
          <Item>세금계산서 발행</Item>
        </Stack>
      </Container>

      <div>
        <Link to="/LoadPrice">
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Button variant="outlined" onClick={handleClick}>
              STEP 7. 요금확인
            </Button>
          </Stack>
        </Link>
      </div>
      <Container sx={{ py: 4 }} maxWidth="md">
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              고객님께서 요청하신 운송건의 추천 요금은 XXXXXX원
            </Typography>
            <Typography align="center" variant="body2" color="text.secondary">
              XXXXXX원
            </Typography>
            <Typography variant="body2" color="text.secondary">
              (기사님 상하차 도움비용 XXXXX원 포함) 입니다.
            </Typography>
            <Typography align="center" variant="body2" color="text.secondary">
              운송을 위뢰 하시겠습니까?
            </Typography>
          </CardContent>
        </Card>
      </Container>
      <Container sx={{ py: 4 }} maxWidth="md">
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Button variant="contained">수락</Button>
          <Button variant="contained">이전으로</Button>
        </Stack>
      </Container>

      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}

export default ShipperRequire;
