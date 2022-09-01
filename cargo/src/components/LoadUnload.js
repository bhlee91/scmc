import * as React from "react";
import Footer from "../common/Footer";
import Appbar from "../common/Appbar";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, createTheme, Divider, ThemeProvider } from "@mui/material";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSearchParams, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import store, { useAppDispatch } from 'src/store';
import cargoSlice from "src/slice/cargo";

import {
  getCommonCodeByType
} from "src/api/code";

const theme = createTheme();

const LoadUnload = () => {
  const cargo = store.getState().cargo
  const dispatch = useAppDispatch();
  const [ params ] = useSearchParams()
  const navigate = useNavigate();

  const [list, setList] = React.useState([])

  const loadApi = () => {
    const codeType = "LDULD";

    getCommonCodeByType(codeType)
    .then(res => {
      setList(res.data)
    })
    .then(() => {
      setLoad({
        value: cargo.loadMethod.value,
        name: cargo.loadMethod.name
      })
  
      setUnLoad({
        value: cargo.unloadMethod.value,
        name: cargo.unloadMethod.name
      })
    })
  }

  const [load, setLoad] = React.useState({
    value: "",
    name: "선택"
  })
  const [unload, setUnLoad] = React.useState({
    value: "",
    name: "선택"
  })

  React.useEffect(() => {
    loadApi()
  }, [])

  const handleLoadChange = (child) => {
    setLoad({
      value: child.props.value,
      name: child.props.children
    })
  }
  
  const handleUnLoadChange = (child) => {
    setUnLoad({
      value: child.props.value,
      name: child.props.children
    })
  }

  const handleChangePage = () => {
    dispatch(
      cargoSlice.actions.SET_REQUEST_5({
        loadMethod: { ...load },
        unloadMethod: { ...unload }
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
                defaultValue=""
                value={load.value}
                onChange={(_e, child) => handleLoadChange(child)}
                label="상차방법" 
              >
                <MenuItem value="">선택</MenuItem>
                {
                  list.map(obj => (
                    <MenuItem key={obj.cdid} value={obj.cdid}>{obj.codeName}</MenuItem>
                  ))
                }
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
                하차방법
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                defaultValue=""
                value={unload.value}
                onChange={(_e, child) => handleUnLoadChange(child)}
                label="하차방법"
              >
                <MenuItem value="">선택</MenuItem>
                {
                  list.map(obj => (
                    <MenuItem key={obj.cdid} value={obj.cdid}>{obj.codeName}</MenuItem>
                  ))
                }
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
          <Button variant="contained" onClick={handleChangePage}>등록</Button>
          <Button variant="contained" onClick={handleCancelPage}>이전</Button>
        </Stack>
      </Box>
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}
export default LoadUnload;
