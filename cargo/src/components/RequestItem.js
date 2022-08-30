import * as React from "react";
import Footer from "../common/Footer";
import Appbar from "../common/Appbar";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, createTheme, Divider, ThemeProvider } from "@mui/material";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useSearchParams } from "react-router-dom";
import Stack from "@mui/material/Stack";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const theme = createTheme();

const RequestItem = () => {
  const [ params ] = useSearchParams();

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
          {/* 요청사항  */}
          <Grid item xs={12} sm={3} md={4} container justifyContent="center">
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="냉장"/>
              <FormControlLabel control={<Checkbox />} label="냉동" />
              <FormControlLabel control={<Checkbox />} label="리프트차량" />
              <FormControlLabel control={<Checkbox />} label="윙바디차량" />
              <FormControlLabel
                control={<Checkbox />}
                label="방풍/방수 차량(탑차, 천막)"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="운송요금 상차지 지불"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="운송요금 하차지 지불"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="세금계산서/현금영수증 발행"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="기사님 상하차 도움(추가요금 발생)"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Container>

      <Divider />
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <Typography variant="body1" display="block" textAlign="center">
          입력하신 요청사항을 등록하시겠습니까? <br /> 이전단계로 이전 시
          입력하신 값들은 초기화 됩니다.
        </Typography>

        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <div></div>
          <Button variant="contained">등록</Button>

          <Button variant="contained" component={Link} to={`/ShipperRequire?stepIndex=${params.get("stepIndex")}`}>
            이전
          </Button>
        </Stack>
      </Box>
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}
export default RequestItem;
