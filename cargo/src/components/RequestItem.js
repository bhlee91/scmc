import * as React from "react";
import Footer from "../common/Footer";
import Appbar from "../common/Appbar";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, createTheme, Divider, FormControl, FormLabel, ThemeProvider } from "@mui/material";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSearchParams, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import { useAppDispatch } from 'src/store';
import cargoSlice from "src/slice/cargo";

import {
  getCommonCodeByRequestItem
} from "src/api/code";

const theme = createTheme();

const RequestItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ params ] = useSearchParams();

  const [ requestList, setRequestList ] = React.useState({})
  // 냉장/냉동여부
  const [ rfofz, setRfofz ] = React.useState({
    value: "RNA",
    name: "냉장/냉동여부_해당없음"
  })
  // 차량종류
  const [ ctype, setCtype ] = React.useState({
    value: "",
    name: "선택안함"
  })
  // 기타 요청사항
  const [ reqit, setReqit ] = React.useState([])

  React.useLayoutEffect(() => {
    getCommonCodeByRequestItem()
    .then(res => {
      setRequestList(res.data)
    })
  }, [])

  const handleRequestChange = props => event => {
    const checked = event.target.checked
    const value = event.target.value
    const name = event.target.name

    const request = {
      value: value,
      name: name
    }

    if (props === "RFOFZ") {
      request.name = `${requestList[props].code_typename}_${request.name}`

      setRfofz(request)
    } else if (props === "CTYPE") {
      request.name = `${requestList[props].code_typename}_${request.name}`

      setCtype(request)
    } else {
      setReqit(items => {
        if (checked) {
          items.push(request)
        } else {
          items.filter(item => item.value === request.value)
        }
        
        return items
      })
    }
  }

  const handleChangePage = () => {
    let requestName = [rfofz.name]
    let requestValue = [rfofz.value]

    if (ctype.value !== "") {
      requestName.push(ctype.name)
      requestValue.push(ctype.value)
    } 
    requestName.push(...reqit.map(e => e.name))
    requestValue.push(...reqit.map(e => e.value))

    dispatch(
      cargoSlice.actions.SET_REQUEST_6({
        requestItems: {
          value: requestValue.join("^"),
          name: requestName
        }
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
          {/* 요청사항  */}
          <FormControl xs={12} sm={3} md={4} style={{ paddingRight: 30 }}>
            <FormLabel component="legend" color="info">{requestList.RFOFZ?.code_typename}</FormLabel>
            <RadioGroup value={rfofz?.value} onChange={handleRequestChange("RFOFZ")}>
              {
                requestList.RFOFZ?.codes.map(code => 
                  <FormControlLabel key={code.cdid} name={code.codeName} value={code.cdid} control={<Radio />} label={code.codeName}/>
                )
              }
            </RadioGroup>
          </FormControl>
          <FormControl xs={12} sm={3} md={4} style={{ paddingRight: 30 }}>
            <FormLabel component="legend" color="info">{requestList.CTYPE?.code_typename}</FormLabel>
            <RadioGroup value={ctype?.value} onChange={handleRequestChange("CTYPE")}>
              {
                requestList.CTYPE?.codes.map(code => 
                  <FormControlLabel key={code.cdid} name={code.codeName} value={code.cdid} control={<Radio />} label={code.codeName}/>
                )
              }
              <FormControlLabel key="" name="선택안함" value="" control={<Radio />} label="선택안함" />
            </RadioGroup>
          </FormControl>
          <FormControl xs={12} sm={3} md={4}>
            <FormLabel component="legend" color="info">{requestList.REQIT?.code_typename}</FormLabel>
            <FormGroup onChange={handleRequestChange("REQIT")}>
              {
                requestList.REQIT?.codes.map(code => 
                  <FormControlLabel key={code.cdid} name={code.codeName} value={code.cdid} control={<Checkbox />} label={code.codeName}/>
                )
              }
            </FormGroup>
          </FormControl>
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
          <Button variant="contained" onClick={handleChangePage}>등록</Button>

          <Button variant="contained" onClick={handleCancelPage}>이전</Button>
        </Stack>
      </Box>
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}
export default RequestItem;
