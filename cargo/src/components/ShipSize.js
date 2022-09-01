import * as React from "react";
import Footer from "../common/Footer";
import Appbar from "../common/Appbar";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  Divider,
  FormControl,
  Stack,
  ThemeProvider,
} from "@mui/material";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import { useSearchParams, useNavigate } from "react-router-dom";

import store, { useAppDispatch } from 'src/store';
import cargoSlice from "src/slice/cargo";

const theme = createTheme();

const ShipSize = () => {
  const cargo = store.getState().cargo
  const dispatch = useAppDispatch();
  const [ params ] = useSearchParams();
  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    horizontal: cargo.cwidth,
    portrait: cargo.cverticalreal,
    height: cargo.cheight,
    weight: cargo.cweight,
    volume: (cargo.cwidth * cargo.cverticalreal * cargo.cheight).toFixed(1),
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangePage = () => {
    dispatch(
      cargoSlice.actions.SET_REQUEST_2({
        cweight: values.weight,
        cheight: values.height,
        cwidth: values.horizontal,
        cverticalreal: values.portrait
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
      <div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          justifyContent="center"
          alignItems="center"
        >
          <div>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-horizontal"
                value={values.horizontal}
                onChange={handleChange("horizontal")}
                endAdornment={
                  <InputAdornment position="end">m</InputAdornment>
                }
                aria-describedby="outlined-horizontal-helper-text"
                inputProps={{
                  "aria-label": "horizontal",
                }}
              />
              <FormHelperText id="outlined-horizontal-helper-text">
                가로
              </FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-portrait"
                value={values.portrait}
                onChange={handleChange("portrait")}
                endAdornment={
                  <InputAdornment position="end">m</InputAdornment>
                }
                aria-describedby="outlined-portrait-helper-text"
                inputProps={{
                  "aria-label": "portrait",
                }}
              />
              <FormHelperText id="outlined-portrait-helper-text">
                세로
              </FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-height"
                value={values.height}
                onChange={handleChange("height")}
                endAdornment={
                  <InputAdornment position="end">m</InputAdornment>
                }
                aria-describedby="outlined-height-helper-text"
                inputProps={{
                  "aria-label": "height",
                }}
              />
              <FormHelperText id="outlined-height-helper-text">
                높이
              </FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-weight"
                value={values.weight}
                onChange={handleChange("weight")}
                endAdornment={
                  <InputAdornment position="end">㎏</InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
              <FormHelperText id="outlined-weight-helper-text">
                무게
              </FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-volume"
                value={(values.horizontal * values.portrait * values.height).toFixed(1)}
                endAdornment={
                  <InputAdornment position="end">㎥</InputAdornment>
                }
                aria-describedby="outlined-volume-helper-text"
                inputProps={{
                  "aria-label": "volume",
                }}
              />
              <FormHelperText id="outlined-volume-helper-text">
                체적
              </FormHelperText>
            </FormControl>
          </div>
        </Box>
      </div>
      <Divider />
      <div>
        <Box sx={{ width: "100%", maxWidth: 500 }}>
          <Typography variant="body1" display="block" textAlign="center">
            입력하신 사이즈를 등록하시겠습니까? <br /> 이전단계로 이전 시
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
      </div>
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}
export default ShipSize;
