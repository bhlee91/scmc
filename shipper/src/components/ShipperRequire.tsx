import * as React from "react";
import Footer from "../common/Footer";
import Appbar from "../common/Appbar";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Camera from "react-html5-camera-photo";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  createTheme,
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  Stack,
  styled,
  ThemeProvider,
  Typography,
} from "@mui/material";

const theme = createTheme();

const steps = [
  {
    label: "단계. 사진등록",
  },
  {
    label: "단계. 화물사이즈 입력",
  },
  {
    label: "단계. 출도착 시간 입력",
  },
  {
    label: "단계. 출발지/도착지 입력",
  },
  {
    label: "단계. 상/하차 방법",
  },
  {
    label: "단계. 요청사항",
  },
  {
    label: "단계. 요금확인",
  },
];

function ShipperRequire2() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const cols = 1;
  const rows = 1;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* app bar component */}
      <Appbar />

      {/* 상단 이미지 */}
      <Container sx={{ py: 1 }} maxWidth="md">
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
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* 상단 이미지 끝*/}

      <Container sx={{ py: 2 }} maxWidth="md">
        <Box sx={{ maxWidth: 400 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 6 ? (
                      <Typography variant="caption">마지막 단계</Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  {/* 1단계 사진등록 */}
                  {index === 0 ? (
                    <Container sx={{ py: 1 }} maxWidth="md">
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
                              height="200"
                              image="./image/5.jpg"
                              alt="카메라 이미지"
                            />
                          </Card>
                        </Grid>
                      </Grid>
                    </Container>
                  ) : null}
                  {/* 1단계 사진등록 끝*/}

                  {/* 2단계 화물사이즈 */}
                  {index === 1 ? (
                    <Container sx={{ py: 1 }} maxWidth="md">
                      <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={1}
                      >
                        <Item>가로 5M</Item>
                        <Item>세로 3M</Item>
                        <Item>높이 3M</Item>
                        <Item>중량 30Kg</Item>
                        <Item>체젹 10M3</Item>
                      </Stack>
                    </Container>
                  ) : null}
                  {/* 2단계 화물사이즈 끝*/}

                  {/* 3단계 출도착시간 */}
                  {index === 2 ? (
                    <Container sx={{ py: 1 }} maxWidth="md">
                      <Stack spacing={1}>
                        <Item>출발일 : 2022년 5월 22일 15시 35분</Item>
                        <Item>도착일 : 2022년 5월 22일 15시 35분</Item>
                      </Stack>
                    </Container>
                  ) : null}
                  {/* 3단계 출도착시간 끝*/}

                  {/* 4단계 출도착지 입력 */}
                  {index === 3 ? (
                    <Container sx={{ py: 1 }} maxWidth="md">
                      <Stack spacing={1}>
                        <Item>출발지 : 서울특별시 강남구 테헤란로 1</Item>
                        <Item>도착지 : 서울특별시 강남구 테헤란로 2</Item>
                      </Stack>
                    </Container>
                  ) : null}
                  {/* 4단계 출도착지 끝*/}

                  {/* 5단계 상하차방법 입력 */}
                  {index === 4 ? (
                    <Container sx={{ py: 1 }} maxWidth="md">
                      <Stack spacing={1}>
                        <Item>상차 방법 : 지게차</Item>
                        <Item>하차 방법 : 지게차</Item>
                      </Stack>
                    </Container>
                  ) : null}
                  {/* 5단계 상하차방법 끝*/}

                  {/* 6단계 요청사항 입력 */}
                  {index === 5 ? (
                    <Container sx={{ py: 1 }} maxWidth="md">
                      <Stack spacing={1}>
                        <Item>운송요금 하차지 지불</Item>
                        <Item>세금계산서 발행</Item>
                      </Stack>
                    </Container>
                  ) : null}
                  {/* 6단계 요청사항 끝*/}

                  {/* 7단계 요청사항 입력 */}
                  {index === 6 ? (
                    <Container sx={{ py: 1 }} maxWidth="md">
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
                          <Typography
                            align="center"
                            variant="body2"
                            color="text.secondary"
                          >
                            XXXXXX원
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            (기사님 상하차 도움비용 XXXXX원 포함) 입니다.
                          </Typography>
                          <Typography
                            align="center"
                            variant="body2"
                            color="text.secondary"
                          >
                            운송을 위뢰 하시겠습니까?
                          </Typography>
                        </CardContent>
                      </Card>
                    </Container>
                  ) : null}
                  {/* 7단계 요청사항 끝*/}

                  <Box sx={{ mb: 2 }}>
                    <div>
                      {index === 0 ? (
                        <Button
                          variant="contained"
                          href="/Camera"
                          sx={{ mt: 1, mr: 1 }}
                        >
                          사진찍기
                        </Button>
                      ) : null}
                      {index === 1 ? (
                        <Button
                          variant="contained"
                          href="/ShipSize"
                          sx={{ mt: 1, mr: 1 }}
                        >
                          화물사이즈입력
                        </Button>
                      ) : null}
                      {index === 2 ? (
                        <Button
                          variant="contained"
                          href="/DateTime"
                          sx={{ mt: 1, mr: 1 }}
                        >
                          출도착 시간 입력
                        </Button>
                      ) : null}
                      {index === 3 ? (
                        <Button
                          variant="contained"
                          href="/Address"
                          sx={{ mt: 1, mr: 1 }}
                        >
                          출발지/도착지 입력
                        </Button>
                      ) : null}
                      {index === 4 ? (
                        <Button
                          variant="contained"
                          href="/LoadUnload"
                          sx={{ mt: 1, mr: 1 }}
                        >
                          상/하차 방법
                        </Button>
                      ) : null}
                      {index === 5 ? (
                        <Button
                          variant="contained"
                          href="/RequestItem"
                          sx={{ mt: 1, mr: 1 }}
                        >
                          요청사항
                        </Button>
                      ) : null}
                      {index === 6 ? (
                        <Button
                          variant="contained"
                          href="/LoadPrice"
                          sx={{ mt: 1, mr: 1 }}
                        >
                          요금확인
                        </Button>
                      ) : null}
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? "수락" : "다음"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        variant="contained"
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        이전으로
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                고객님이 의뢰하신 화물이 정상적으로 등록되었습니다.
              </Typography>
              <Button
                variant="contained"
                onClick={handleReset}
                sx={{ mt: 1, mr: 1 }}
              >
                홈으로
              </Button>
              <Button
                variant="contained"
                onClick={handleBack}
                sx={{ mt: 1, mr: 1 }}
              >
                이전으로
              </Button>
            </Paper>
          )}
        </Box>
      </Container>

      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}
export default ShipperRequire2;
