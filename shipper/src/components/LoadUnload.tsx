import * as React from "react";
import Footer from "../common/Footer";
import Appbar from "../common/Appbar";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, createTheme, Divider, ThemeProvider } from "@mui/material";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const theme = createTheme();

function LoadUnload() {
  const [load, setLoad] = React.useState("");
  const [unload, setUnLoad] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setLoad(event.target.value);
  };
  const handleChange1 = (event: SelectChangeEvent) => {
    setUnLoad(event.target.value);
  };
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
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                상차방법
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={load}
                onChange={handleChange}
                label="상차방법"
              >
                <MenuItem value="">
                  <em>선택</em>
                </MenuItem>
                <MenuItem value={1}>수작업</MenuItem>
                <MenuItem value={2}>지게차</MenuItem>
                <MenuItem value={3}>크레인</MenuItem>
                <MenuItem value={4}>호이스트</MenuItem>
                <MenuItem value={5}>컨베이어</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ py: 2 }} maxWidth="md">
        {/* End hero unit */}

        <Grid container spacing={1}>
          {/* 출발 날짜  */}
          <Grid item xs={12} sm={3} md={4} container justifyContent="center">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                상차방법
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={unload}
                onChange={handleChange1}
                label="하차방법"
              >
                <MenuItem value="">
                  <em>선택</em>
                </MenuItem>
                <MenuItem value={1}>수작업</MenuItem>
                <MenuItem value={2}>지게차</MenuItem>
                <MenuItem value={3}>크레인</MenuItem>
                <MenuItem value={4}>호이스트</MenuItem>
                <MenuItem value={5}>컨베이어</MenuItem>
              </Select>
            </FormControl>
          </Grid>
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
          <Button variant="contained">등록</Button>

          <Button variant="contained" component={Link} to="/ShipperRequire">
            이전
          </Button>
        </Stack>
      </Box>
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}
export default LoadUnload;
