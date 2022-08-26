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
import { Link, useSearchParams } from "react-router-dom";
import { createBrowserHistory } from "history";

const theme = createTheme();

const ShipSize = () => {
  const history = createBrowserHistory();
  const [params, setParams] = useSearchParams();

  const [values, setValues] = React.useState({
    horizontal: "",
    portrait: "",
    height: "",
    weight: "",
    volume: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  React.useEffect(() => {
    console.log(history)
    const listenBackEvent = () => {
      const stepIndex = params.get("stepIndex")
      
      setParams({stepIndex: stepIndex})
    }

    const listenHistoryEvent = history.listen(({ action }) => {
      
      if (action === "POP") listenBackEvent();
    })

    return listenHistoryEvent;

  }, [history, params])

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
                id="outlined-adornment-weightt"
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
                id="outlined-adornment-weightt"
                value={values.volume}
                onChange={handleChange("volume")}
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
            <Button variant="contained">등록</Button>

            <Button variant="contained" component={Link} to={`/ShipperRequire?stepIndex=${params.get("stepIndex")}`} >
              이전
            </Button>
          </Stack>
        </Box>
      </div>
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}
export default ShipSize;
