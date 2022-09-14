import * as React from "react";

import DashboardLayout from "pages/LayoutContainers/DashboardLayout";
import DashboardNavbar from "pages/Navbars/DashboardNavbar";
import Footer from "pages/Footer";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import Stack from "@mui/material/Stack";

import { Card, CardContent, CardActionArea } from "@mui/material";

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

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
  },
];

// 팝업 끝

// 차주 데이타
const columns = [
  {
    field: "id",
    headerName: "사용자ID",
    width: 80,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "car_number",
    headerName: "차량번호",
    width: 130,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "phone_number",
    headerName: "전화번호",
    width: 150,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    editable: true,
  },
  {
    field: "truckowner_Name",
    headerName: "이름",
    type: "number",
    width: 170,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Business_No",
    headerName: "사업자등록번호",
    sortable: false,
    width: 130,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "addr",
    headerName: "주소",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 250,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Truck_tons",
    headerName: "트럭톤수",
    sortable: false,
    width: 100,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "LongYN",
    headerName: "장축여부",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 140,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "refrigerated_frozen",
    headerName: "냉장냉동여부",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 140,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Stowage_type",
    headerName: "적재함형태",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 140,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Lift_type",
    headerName: "리프트타입",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 140,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
];

const rows = [
  {
    id: 1,
    car_number: "122가1234",
    phone_number: "010-123-456",
    truckowner_Name: "홍길동",
    Business_No: "123456789",
    addr: "경기도 성남시 탄천상로",
    Truck_tons: "1톤",
    LongYN: "장축",
    refrigerated_frozen: "해당없음",
    Stowage_type: "호로",
    Lift_type: "해당없음",
  },
  {
    id: 2,
    car_number: "122가1234",
    phone_number: "010-123-456",
    truckowner_Name: "홍길동",
    Business_No: "123456789",
    addr: "경기도 성남시 탄천상로",
    Truck_tons: "1톤",
    LongYN: "장축",
    refrigerated_frozen: "해당없음",
    Stowage_type: "호로",
    Lift_type: "해당없음",
  },
  {
    id: 3,
    car_number: "122가1234",
    phone_number: "010-123-456",
    truckowner_Name: "홍길동",
    Business_No: "123456789",
    addr: "경기도 성남시 탄천상로",
    Truck_tons: "1톤",
    LongYN: "장축",
    refrigerated_frozen: "해당없음",
    Stowage_type: "호로",
    Lift_type: "해당없음",
  },
  {
    id: 4,
    car_number: "122가1234",
    phone_number: "010-123-456",
    truckowner_Name: "홍길동",
    Business_No: "123456789",
    addr: "경기도 성남시 탄천상로",
    Truck_tons: "1톤",
    LongYN: "장축",
    refrigerated_frozen: "해당없음",
    Stowage_type: "호로",
    Lift_type: "해당없음",
  },
  {
    id: 5,
    car_number: "122가1234",
    phone_number: "010-123-456",
    truckowner_Name: "홍길동",
    Business_No: "123456789",
    addr: "경기도 성남시 탄천상로",
    Truck_tons: "1톤",
    LongYN: "장축",
    refrigerated_frozen: "해당없음",
    Stowage_type: "호로",
    Lift_type: "해당없음",
  },
  {
    id: 6,
    car_number: "122가1234",
    phone_number: "010-123-456",
    truckowner_Name: "홍길동",
    Business_No: "123456789",
    addr: "경기도 성남시 탄천상로",
    Truck_tons: "1톤",
    LongYN: "장축",
    refrigerated_frozen: "해당없음",
    Stowage_type: "호로",
    Lift_type: "해당없음",
  },
  {
    id: 7,
    car_number: "122가1234",
    phone_number: "010-123-456",
    truckowner_Name: "홍길동",
    Business_No: "123456789",
    addr: "경기도 성남시 탄천상로",
    Truck_tons: "1톤",
    LongYN: "장축",
    refrigerated_frozen: "해당없음",
    Stowage_type: "호로",
    Lift_type: "해당없음",
  },
  {
    id: 8,
    car_number: "122가1234",
    phone_number: "010-123-456",
    truckowner_Name: "홍길동",
    Business_No: "123456789",
    addr: "경기도 성남시 탄천상로",
    Truck_tons: "1톤",
    LongYN: "장축",
    refrigerated_frozen: "해당없음",
    Stowage_type: "호로",
    Lift_type: "해당없음",
  },
];

// 차주 화물 데이타
const cargocolumns = [
  {
    field: "id",
    headerName: "화물ID",
    width: 50,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "cargo_name",
    headerName: "화물명칭",
    width: 240,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "name",
    headerName: "화주성명",
    width: 100,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
    // editable: true,
  },
  {
    field: "phone_number",
    headerName: "화주전화번호",
    type: "number",
    width: 150,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "depart_datetimes",
    headerName: "출발일시",
    sortable: false,
    width: 190,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "arrival_datetimes",
    headerName: "도착일시",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 190,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "depart_addr_st",
    headerName: "상차지",
    sortable: false,
    width: 250,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "arrival_addr_st",
    headerName: "하차지",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 250,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "status",
    headerName: "상태",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 100,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
];

const cargorows = [
  {
    id: 1,
    cargo_name: "과일 상자 10개",
    name: "홍길동",
    phone_number: "010-1234-56789",
    depart_datetimes: "2022-09-09 12시 00분",
    arrival_datetimes: "022-09-09 18시 00분",
    depart_addr_st: "경기도 성남시 탄천상로",
    arrival_addr_st: "충남 천안시 백석동",
    status: "운송완료",
  },
  {
    id: 2,
    cargo_name: "과일 상자 10개",
    name: "홍길동",
    phone_number: "010-1234-56789",
    depart_datetimes: "2022-09-09 12시 00분",
    arrival_datetimes: "022-09-09 18시 00분",
    depart_addr_st: "경기도 성남시 탄천상로",
    arrival_addr_st: "충남 천안시 백석동",
    status: "운송완료",
  },
];

function Truckowner() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const handleRowClick = (params) => {
    setMessage(`Row ID "${params.row.id}" clicked`);
    setVisible(true);
  };

  const handleCargoRowClick = (params) => {
    setMessage(`cargo Row ID "${params.row.id}" clicked`);
    setOpen(true);
  };
  // 상세정보
  const [values, setValues] = React.useState({
    business_no: "",
    cname: "",
    free_yn: "N",
    loryn: "ONA",
    rfofz: "RNA",
    STOTY: "SCG",
    LFTYN: "LNA",
    pay_remain: "",
    car_number: "",
    phone_number: "",
  });
  const inputhandleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  // 상세정보 끝

  const [svalues, setSvalues] = React.useState({
    startdate: "",
    enddate: "",
    owner_name: "",
    car_no: "",
  });

  const handleChange = (prop) => (event) => {
    setSvalues({ ...svalues, [prop]: event.target.value });
  };
  const handleClose = () => {
    setOpen(false);
  };
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
                            id="date"
                            type="date"
                            label="가입시작일"
                            defaultValue="2017-05-24"
                            value={svalues.startdate}
                            sx={{ m: 1, width: 200 }}
                            onChange={handleChange("startdate")}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            size="small"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={2}>
                        <Stack component="form" noValidate spacing={1}>
                          <TextField
                            id="date"
                            type="date"
                            defaultValue="2017-05-24"
                            label="가입종료일"
                            value={svalues.enddate}
                            sx={{ m: 1, width: 200 }}
                            onChange={handleChange("enddate")}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            size="small"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={2}>
                        <Stack component="form" noValidate spacing={1}>
                          <TextField
                            id="owner_name"
                            value={svalues.product_name}
                            label="차주성명"
                            size="small"
                            sx={{ m: 1, width: "25ch" }}
                            onChange={handleChange("owner_name")}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={2}>
                        <Stack component="form" noValidate spacing={1}>
                          <TextField
                            id="car_no"
                            value={svalues.car_no}
                            label="차량번호"
                            size="small"
                            sx={{ m: 1, width: "25ch" }}
                            onChange={handleChange("car_no")}
                          />
                        </Stack>
                      </Grid>

                      <Grid item container xs={2} display="flex" justify="center">
                        <Stack justifyContent="center" spacing={2}>
                          <Button variant="contained" size="small" color="info">
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
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            rowSpacingType="border"
            density="compact"
            onRowClick={handleRowClick}
            sx={{ fontSize: 14, fontFamily: "-apple-system", fontWeight: 400 }}
          />
        </Box>
        {message && <Alert severity="info">{message}</Alert>}
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
                    </MDTypography>
                    <Box sx={{ width: "100%" }}>
                      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={2}>
                          <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                            차량번호
                          </MDTypography>
                        </Grid>

                        <Grid item xs={4}>
                          <TextField
                            id="car_number"
                            value={values.car_number}
                            sx={{ m: 1, width: "25ch" }}
                            size="small"
                            onChange={inputhandleChange("car_number")}
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
                            홍길동
                          </MDTypography>
                        </Grid>

                        <Grid item xs={2}>
                          <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                            연락처
                          </MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="phone_number"
                            value={values.phone_number}
                            size="small"
                            sx={{ m: 1, width: "25ch" }}
                            onChange={inputhandleChange("phone_number")}
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
                            id="business_no"
                            value={values.business_no}
                            size="small"
                            fullwidth
                            onChange={inputhandleChange("business_no")}
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
                              id="cname"
                              value={values.loadmethod}
                              onChange={inputhandleChange("cname")}
                              size="small"
                              fullwidth
                            >
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
                            초장작여부
                          </MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <FormControl>
                            <RadioGroup
                              row
                              id="rfofz"
                              value={values.LORYN}
                              onChange={inputhandleChange("loryn")}
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
                              id="STOTY"
                              value={values.ctype}
                              onChange={inputhandleChange("STOTY")}
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
                              id="rfofz"
                              value={values.rfofz}
                              onChange={inputhandleChange("rfofz")}
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
                              id="LFTYN"
                              value={values.LFTYN}
                              onChange={inputhandleChange("LFTYN")}
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
                            value={values.height}
                            size="small"
                            sx={{ m: 1, width: "25ch" }}
                            onChange={inputhandleChange("business_copy")}
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
                              id="free_yn"
                              value={values.LORYN}
                              onChange={inputhandleChange("loryn")}
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
                            id="pay_remain"
                            value={values.cvertical}
                            size="small"
                            sx={{ m: 1, width: "25ch" }}
                            onChange={inputhandleChange("pay_remain")}
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
                        &nbsp;<strong>총 xx 건</strong> 이 있습니다.
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
                    rows={cargorows}
                    columns={cargocolumns}
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
          fullWidth
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
                                    100,000원
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
                                    100,000원
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
                                    지게차
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
                                    지게차
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    수취인정보
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <MDTypography gutterBottom variant="body2">
                                    010-1234-5678
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
                                    2022-09-12
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
                                    안전하게 배송해 주세요
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
                    {itemData.map((item) => (
                      <ImageListItem key={item.img}>
                        <img
                          src={`${item.img}?w=248&fit=crop&auto=format`}
                          srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                          alt={item.title}
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
                  <ImageList sx={{ width: 700, height: 500 }}>
                    {itemData.map((item) => (
                      <ImageListItem key={item.img}>
                        <img
                          src={`${item.img}?w=248&fit=crop&auto=format`}
                          srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                          alt={item.title}
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
