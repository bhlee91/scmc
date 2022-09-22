import * as React from "react";
import {Buffer} from 'buffer';
import DashboardLayout from "pages/LayoutContainers/DashboardLayout";
import DashboardNavbar from "pages/Navbars/DashboardNavbar";
import Footer from "pages/Footer";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import Stack from "@mui/material/Stack";

import { Card, CardContent, CardActionArea, AlertTitle } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import Icon from "@mui/material/Icon";
import MDTypography from "components/MDTypography";

// 파업용 시작
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "components/MDButton";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useMaterialUIController } from "context";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import FormControlLabel from "@mui/material/FormControlLabel";

import cargocolumns from "./cargocolumns.json";
import columns from "./columns.json";

import { 
  getTruckOwnerList, getTruckOwner, modTruckOwner
} from "api/truck";
import { formatFare } from "utils/commonUtils";
import { formatInKorea, getDateDiff } from "utils/dateUtils";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
  },];

function Truckowner() {
  const [rows, setRows] = React.useState([]);
  const [cargoLoadImages, setCargoLoadImages] = React.useState([]);
  const [cargoUnLoadImages, setCargoUnLoadImages] = React.useState([]);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [rowId, setRowId] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [cargoData, setCargoData] = React.useState([]);
  
  const handleRowClick = (params) => {
    setVisible(true);
    setRowId(params.row.truckownerUid)
    
    getTruckOwner(params.row.truckownerUid)
      .then(res => { 
        const payment = res.data.payment  
        payment.map((key) =>{
          if(payment.length !== 0){
            const today = new Date()
            const payRemain = getDateDiff(key.svcEndDt, today)
            res.data.payRemain = payRemain
            res.data.productName = key.product.productName
          }
        })
        setValues(res.data)
        const hist = res.data.hist
        setData([])
        hist.map(key =>
          {
            if(hist.length !== 0){
              const requests = key.requests
              getCargoColumnValue(requests)
              setData(data => [...data, requests])
            }
          }
        )
      })
    
  };
  const handleCargoRowClick = (params) => {
    const cdata = params.row;
    [cdata].map((obj) => {
      switch(obj.loadMethod) {
        case 'HJ' :
          return obj.loadMethod = '수작업'
        case 'FL' :
          return obj.loadMethod = '지게차'
        case 'CR' :
          return obj.loadMethod = '크레인'
        case 'HT' :
          return obj.loadMethod = '호이스트'
        case 'CV' :
            return obj.loadMethod = '컨베이어'
      } 
    });

    [cdata].map((obj) => {
      switch(obj.unloadMethod) {
        case 'HJ' :
          return obj.unloadMethod = '수작업'
        case 'FL' :
          return obj.unloadMethod = '지게차'
        case 'CR' :
          return obj.unloadMethod = '크레인'
        case 'HT' :
          return obj.unloadMethod = '호이스트'
        case 'CV' :
          return obj.unloadMethod = '컨베이어'
      } 
    });

    [cdata].map((obj) => {
      obj.transitFare = formatFare(obj.transitFare)
      obj.additionalFare = formatFare(obj.additionalFare)
    })

    const loadImages = cdata.images.filter(item => item.memDiv !== "M02")
    const unLoadImages = cdata.images.filter(item => item.memDiv !== "M01")

    loadImages.map((obj) => {
      obj.contents = Buffer.from(obj.imageContents, 'base64')
    })

    unLoadImages.map((obj) => {
      obj.contents = Buffer.from(obj.imageContents, 'base64')
    })

    setCargoLoadImages(loadImages)
    setCargoUnLoadImages(unLoadImages)
    setCargoData(cdata)
    setOpen(true);
  };
  // 상세정보
  const [values, setValues] = React.useState([]);
  const inputhandleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  // 상세정보 끝

  const getCargoColumnValue = data => {
    [data].map((obj) => {
      obj.departDatetimes = formatInKorea(obj.departDatetimes)
      obj.arrivalDatetimes = formatInKorea(obj.arrivalDatetimes)
    });

    [data].map((obj) => {
      switch(obj.status) {
        case 'RO' :
          return obj.status = '준비/등록중'
        case 'MO' :
          return obj.status = '최적차량검색'
        case 'MF' :
          return obj.status = '매칭완료'
        case 'LC' :
          return obj.status = '상차완료'
        case 'TO' :
          return obj.status = '운송중'
        case 'UC' :
          return obj.status = '하차완료'          
        case 'TF' :
          return obj.status = '운송완료'
        case 'TN' :
          return obj.status = '운송취소'
      }
    });
  }

  const getColumnValue = data => {
    data.map((obj) => {
      switch(obj.longyn) {
        case 'LOY' :
          return obj.longyn = '초장축'
        case 'ONA' :
          return obj.longyn = '해당없음'
      }
    })
    
    data.map((obj) => {
      switch(obj.refrigeratedFrozen) {
        case 'rrf' :
          return obj.refrigeratedFrozen = '냉장'
        case 'ffz' :
          return obj.refrigeratedFrozen = '냉동'
        case 'rna' :
          return obj.refrigeratedFrozen = '해당없음'
      } 
    })

    data.map((obj) => {
      switch(obj.truckTons) {
        case '0P55T' :
          return obj.truckTons = '0.55톤'
        case '1000T' :
          return obj.truckTons = '1톤'
        case '1P04T' :
          return obj.truckTons = '1.4톤'
        case '2P05T' :
          return obj.truckTons = '2.5톤'
        case '3P05T' :
          return obj.truckTons = '3.5톤'
        case '5000T' :
          return obj.truckTons = '5톤'
        case '500PT' :
          return obj.truckTons = '5톤 플러스'
        case '500XT' :
          return obj.truckTons = '5톤 축'
        case '1100T' :
          return obj.truckTons = '11톤'
        case '1800T' :
          return obj.truckTons = '18톤'
      } 
    })

    data.map((obj) => {
      switch(obj.stowageType) {
        case 'SCG' :
          return obj.stowageType = '카고'
        case 'SWB' :
          return obj.stowageType = '윙바디'
        case 'STC' :
          return obj.stowageType = '탑차'
        case 'STT' :
          return obj.stowageType = '천막/호루'
      } 
    })

    data.map((obj) => {
      switch(obj.liftType) {
        case 'LLF' :
          return obj.liftType = '리프트'
        case 'LNA' :
          return obj.liftType = '해당없음'
      } 
    })
  }

  const [svalues, setSvalues] = React.useState({
    truckownerName: "",
    carNumber: "",
    businessNo: ""
  });

  const handleChange = (prop) => (event) => {
    setSvalues({ ...svalues, [prop]: event.target.value }); 
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const searchTruckOwner = () => {
    getTruckOwnerList(
      0,
      10,
      svalues.truckownerName == "" ? null : svalues.truckownerName,
      svalues.carNumber == "" ? null : svalues.carNumber,
      svalues.businessNo == "" ? null : svalues.businessNo
      )
    .then(res => {
      getColumnValue(res.data.content)
      const result = res.data.content
      return result
    })
    .then(result => {
      setRows(result)
    })
  };

  const updateTruckOwner = () => {
    if(rowId !== 0){
      modTruckOwner(values, rowId)
      .then(res => {
        //console.log(res)
        return(
          <Alert serverity="success">
            <AlertTitle>Success</AlertTitle>
            {res.data}
          </Alert>
        )
      })
    }
      
  }

  const businessCopyUpload = () => {

  }
  
  React.useEffect(() => {
    getTruckOwnerList(
      0,
      10,
      svalues.carNumber == "" ? null : svalues.carNumber,
      svalues.businessNo == "" ? null : svalues.businessNo,
      svalues.truckownerName == "" ? null : svalues.truckownerName,
      )
    .then(res => {
      getColumnValue(res.data.content)
      const result = res.data.content
      return result
    })
    .then(result => {
      setRows(result)
    })
  }, [])

  //  팝업용 끝
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* 검색 조건 시작 */}
      <MDBox py={3}>
        <Grid item xs={12} md={6} lg={12}>
          <MDBox alignItems="center" justifyContent="center">
            <Card>
              <CardActionArea>
                <CardContent>
                  <Box>
                    <Grid
                      container
                      direction="row"
                      rowSpacing={1}
                      align="center"
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item xs={2}>
                        <Stack component="form" noValidate spacing={1}>
                          <TextField
                            id="truckownerName"
                            value={svalues.truckownerName}
                            label="차주성명"
                            size="small"
                            sx={{ m: 1, width: "25ch" }}
                            onChange={handleChange("truckownerName")}
                          />
                        </Stack>
                      </Grid>

                      <Grid item xs={2}>
                        <Stack component="form" noValidate spacing={1}>
                          <TextField
                            id="carNumber"
                            value={svalues.carNumber}
                            label="차량번호"
                            size="small"
                            sx={{ m: 1, width: "25ch" }}
                            onChange={handleChange("carNumber")}
                          />
                        </Stack>
                      </Grid>
                      
                      <Grid item xs={2}>
                        <Stack component="form" noValidate spacing={1}>
                          <TextField
                            id="businessNo"
                            value={svalues.businessNo}
                            label=" 사업자 번호"  
                            size="small"
                            sx={{ m: 1, width: "25ch" }}
                            onChange={handleChange("businessNo")}
                          />
                        </Stack>
                      </Grid>

                      <Grid item container xs={2} display="flex" justify="center">
                        <Stack justifyContent="center" spacing={2}>
                          <Button variant="contained" size="small" color="info" onClick = {searchTruckOwner}>
                            검색
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </MDBox>
        </Grid>
      </MDBox>
      {/* 검색 조건 끝 */}
      {/* 테이블 그리기 */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Box
          display="flex"
          sx={{
            width: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "rgba(0, 188, 212, 0.1)",
            },
            boxShadow: 1,
            border: 1,
            borderColor: "secondary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
        >
          <DataGrid
            autoHeight
            rows={rows}
            getRowId={(obj) => obj.truckownerUid}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            rowSpacingType="border"
            density="compact"
            onRowClick={handleRowClick}
            on
            sx={{ fontSize: 14, fontFamily: "-apple-system", fontWeight: 400 }}
          />
        </Box>
      </Stack>
      <Divider />
      {/* 차주 상세정보 시작 */}
      <MDBox py={3}>
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6} lg={12}>
            <MDBox alignItems="center" justifyContent="center">
              <Card>
                <CardActionArea>
                  <CardContent>
                    <MDTypography gutterBottom variant="h5" color="success">
                      상세정보
                      <Grid item container xs={12} display="flex" justify="right">
                        <Stack justifyContent="center" spacing={2}>
                          <Button variant="contained" size="small" color="info" onClick = {updateTruckOwner}>
                            수정
                          </Button>
                        </Stack>
                      </Grid>
                    </MDTypography>

                    <Box sx={{ width: "100%" }}>
                      <Grid container columnSpacing={{ xs: 1, sm: 2,  md: 3 }}>
                        <Grid item xs={2}>
                          <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                            차량번호
                          </MDTypography>
                        </Grid>

                        <Grid item xs={4}>
                          <TextField
                            id="carNumber"
                            value={values.carNumber || ''}
                            sx={{ m: 1, width: "25ch" }}
                            size="small"
                            onChange={inputhandleChange("carNumber")}
                            InputProps={{
                              endAdornment: <InputAdornment position="end"></InputAdornment>,
                            }}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                            차주명
                          </MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                            {values.truckownerName}
                          </MDTypography>
                        </Grid>

                        <Grid item xs={2}>
                          <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                            연락처
                          </MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="phoneNumber"
                            value={values.phoneNumber || ''}
                            size="small"
                            sx={{ m: 1, width: "25ch" }}
                            onChange={inputhandleChange("phoneNumber")}
                            InputProps={{
                              endAdornment: <InputAdornment position="end"></InputAdornment>,
                            }}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                            사업자번호
                          </MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="businessNo"
                            value={values.businessNo || ''}
                            size="small"
                            fullwidth = "true"
                            onChange={inputhandleChange("businessNo")}
                            InputProps={{
                              endAdornment: <InputAdornment position="end"></InputAdornment>,
                            }}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                            차량톤수
                          </MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <FormControl sx={{ m: 1, minWidth: 180 }}>
                            <Select
                              sx={{ height: 40, minWidth: 180 }}
                              id="truckTons"
                              value={values.truckTons || ''}
                              onChange={inputhandleChange("truckTons")}
                              size="small"
                              fullwidth = "true"
                              defaultValue={""}
                            >
                              <MenuItem value={""}>해당없음</MenuItem>
                              <MenuItem value={"0P55T"}>0.55톤</MenuItem>
                              <MenuItem value={"1000T"}>1톤</MenuItem>
                              <MenuItem value={"1P04T"}>1.4톤</MenuItem>
                              <MenuItem value={"2P05T"}>2.5톤</MenuItem>
                              <MenuItem value={"3P05T"}>3.5톤</MenuItem>
                              <MenuItem value={"5000T"}>5톤</MenuItem>
                              <MenuItem value={"500PT"}>5톤 플러스</MenuItem>
                              <MenuItem value={"500XT"}>5톤 축</MenuItem>
                              <MenuItem value={"1100T"}>11톤</MenuItem>
                              <MenuItem value={"1800T"}>18톤</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                          <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                            초장축여부
                          </MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <FormControl>
                            <RadioGroup
                              row
                              id="longyn"
                              value={values.longyn || ''}
                              onChange={inputhandleChange("longyn")}
                            >
                              <FormControlLabel value="LOY" control={<Radio />} label="초장축" />
                              <FormControlLabel value="ONA" control={<Radio />} label="해당없음" />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                          <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                            적재함형태
                          </MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <FormControl>
                            <RadioGroup
                              row
                              id="stowageType"
                              value={values.stowageType || ''}
                              onChange={inputhandleChange("stowageType")}
                            >
                              <FormControlLabel value="SCG" control={<Radio />} label="카고" />
                              <FormControlLabel value="SWB" control={<Radio />} label="윙바디" />
                              <FormControlLabel value="STC" control={<Radio />} label="탑차" />
                              <FormControlLabel value="STT" control={<Radio />} label="천막/호루" />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                          <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                            냉장냉동여부
                          </MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <FormControl>
                            <RadioGroup
                              row
                              id="refrigeratedFrozen"
                              value={values.refrigeratedFrozen || ''}
                              onChange={inputhandleChange("refrigeratedFrozen")}
                            >
                              <FormControlLabel value="rrf" control={<Radio />} label="냉장" />
                              <FormControlLabel value="ffz" control={<Radio />} label="냉동" />
                              <FormControlLabel value="rna" control={<Radio />} label="해당없음" />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                          <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                            리프트여부
                          </MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <FormControl>
                            <RadioGroup
                              row
                              id="liftType"
                              value={values.liftType || ''}
                              onChange={inputhandleChange("liftType")}
                            >
                              <FormControlLabel value="LLF" control={<Radio />} label="리프트" />
                              <FormControlLabel value="LNA" control={<Radio />} label="해당없음" />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                          <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                            사업자등록증 사본
                          </MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="business_copy"
                            value={''}
                            size="small"
                            sx={{ m: 1, width: "25ch" }}
                            onClick = {businessCopyUpload}
                            type="file"
                            accept="image/jpg, image/jpeg, image/png"
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                            무료/유료회원여부
                          </MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <FormControl>
                            <RadioGroup
                              row
                              id="freeyn"
                              value={values.freeyn || ''}
                              onChange={inputhandleChange("freeyn")}
                            >
                              <FormControlLabel value="N" control={<Radio />} label="유료" />
                              <FormControlLabel value="Y" control={<Radio />} label="무료" />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                          <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                            유료회원 남은기간
                          </MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="payRemain"
                            value={values.payRemain || ''}
                            size="small"
                            sx={{ m: 1, width: "25ch" }}
                            onChange={inputhandleChange("payRemain")}
                            InputProps={{
                              endAdornment: <InputAdornment position="end">일</InputAdornment>,
                            }}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                            결재관리
                          </MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <MDTypography gutterBottom variant="body2">
                            신용카드
                          </MDTypography>
                        </Grid>
                        <Grid item xs={2}>
                          <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                            가입 상품
                          </MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <MDTypography gutterBottom variant="body2">
                            3개월 상품
                          </MDTypography>
                        </Grid>
                        <Grid item xs={2}>
                          <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                            비밀번호 리셋
                          </MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <Button variant="contained" color="primary" size="small">
                            리셋
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      {/* 차주 상세정보 끝 */}
      {/* // 운송내역 시작 */}
      {visible && (
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <Card>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                  <MDBox>
                    <MDTypography variant="h6" gutterBottom>
                      운송내역
                    </MDTypography>
                    <MDBox display="flex" alignItems="center" lineHeight={0}>
                      <Icon
                        sx={{
                          fontWeight: "bold",
                          color: ({ palette: { info } }) => info.main,
                          mt: -0.5,
                        }}
                      >
                        done
                      </Icon>
                      <MDTypography variant="button" fontWeight="regular" color="text">
                        &nbsp;<strong>총 {data.length} 건</strong> 이 있습니다.
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </MDBox>
                <MDBox
                  display="flex"
                  color={darkMode ? "white" : "secondary"}
                  sx={{
                    width: "100%",
                    "& .super-app-theme--header": {
                      backgroundColor: "rgba(255, 153, 051, 0.1)",
                    },
                    boxShadow: 1,
                    border: 1,
                    borderColor: "secondary.light",
                    "& .MuiDataGrid-cell:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  <DataGrid
                    autoHeight
                    rows={data}
                    columns={cargocolumns}
                    getRowId={(obj) => obj.reqId}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    rowSpacingType="border"
                    density="compact"
                    onRowClick={handleCargoRowClick}
                    color={darkMode ? "white" : "secondary"}
                    sx={{ fontSize: 14, fontFamily: "-apple-system", fontWeight: 400 }}
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      )}
      {/* // 운송내역 끝 */}

      {/* 팝업 시작 */}
      <div>
        <Dialog
          // fullScreen={fullScreen}
          fullWidth = "true"
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "800px", // Set your width here
              },
            },
          }}
        >
          <DialogTitle id="responsive-dialog-title">내역 상세조회</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <MDBox py={3}>
                <Grid container spacing={1} alignItems="center" justifyContent="center">
                  <Grid item xs={12} md={6} lg={12}>
                    <MDBox alignItems="center" justifyContent="center">
                      <Card>
                        <CardActionArea>
                          <CardContent>
                            <MDTypography gutterBottom variant="h5" color="success">
                              상세정보
                            </MDTypography>
                            <Box sx={{ width: "100%" }}>
                              <Grid
                                container
                                rowSpacing={1}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                              >
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    요금
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <MDTypography gutterBottom variant="body2">
                                    {cargoData.transitFare}원
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    추가요금
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <MDTypography gutterBottom variant="body2">
                                  {cargoData.additionalFare}원
                                  </MDTypography>
                                </Grid>
                                <Divider />
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    상차방법
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <MDTypography gutterBottom variant="body2">
                                    {cargoData.loadMethod}
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    하차방법
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <MDTypography gutterBottom variant="body2">
                                    {cargoData.unloadMethod}
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    의뢰인번호
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <MDTypography gutterBottom variant="body2">
                                    {cargoData.receiverPhone}
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    운송완료일
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <MDTypography gutterBottom variant="body2">
                                    {cargoData.regComDate}
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    요청사항
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={6}>
                                  <MDTypography gutterBottom variant="body2">
                                    {cargoData.requestItems}
                                  </MDTypography>
                                </Grid>
                              </Grid>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
              <Divider />
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <MDBox py={1}>
                  <MDTypography gutterBottom variant="h5">
                    상차지 이미지
                  </MDTypography>
                  <ImageList sx={{ width: 700, height: 500 }}>
                    {cargoLoadImages.map((item) => (
                      <ImageListItem key={item.imageId}>
                        <img
                          src={item.contents}
                          srcSet={item.contents}
                          alt={item.imageSeq}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </MDBox>
              </Grid>
              <Divider />
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <MDBox py={1}>
                  <MDTypography gutterBottom variant="h5">
                    하차지 이미지
                  </MDTypography>
                  <ImageList sx={{ width: 700, height: 500 }} >
                    
                    {cargoUnLoadImages.map((item) => (
                      <ImageListItem key={item.imageId}>
                        <img
                          src={item.contents}
                          srcSet={item.contents}
                          alt={item.imageSeq}
                          loading="lazy"
                          
                        />
                      </ImageListItem> 
                    ))}
                  </ImageList>
                </MDBox>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus component="label" onClick={handleClose}>
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* 팝업 끝 */}
      <Footer />
    </DashboardLayout>
  );
}

export default Truckowner;
