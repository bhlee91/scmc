import * as React from "react";

import DashboardLayout from "pages/LayoutContainers/DashboardLayout";
import DashboardNavbar from "pages/Navbars/DashboardNavbar";
import Footer from "pages/Footer";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import Stack from "@mui/material/Stack";

import { Card, CardContent, CardActionArea, CardActions } from "@mui/material";

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
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "components/MDButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useMaterialUIController } from "context";
import Chip from "@mui/material/Chip";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import DialogContentText from "@mui/material/DialogContentText";

// 팝업용

const columns = [
  { field: "id", headerName: "id", width: 50 },
  { field: "names", headerName: "이름", width: 70 },
  { field: "tons", headerName: "톤수", width: 30 },
  { field: "loaddate", headerName: "상차일시", width: 130 },
  {
    field: "unloaddate",
    headerName: "하차일시",
    width: 130,
  },
  {
    field: "depart_addr",
    headerName: "상차지주소",
    width: 150,
  },
  {
    field: "depart_addr",
    headerName: "하차지",
    width: 150,
  },
  {
    field: "load_rate",
    headerName: "적재율",
    width: 150,
  },
];

const rows = [
  {
    id: 1,
    names: "홍길동",
    tons: "1톤",
    loaddate: "2022-09-12 오전 10시 00분",
    unloaddate: "2022-09-12 오전 10시 00분",
    depart_addr: "경기도 성남시 탄청상로",
    arrival_addr: "서울 강남구 테헤란로",
    load_rate: "30%",
  },
  {
    id: 2,
    names: "홍길동",
    tons: "1톤",
    loaddate: "2022-09-12 오전 10시 00분",
    unloaddate: "2022-09-12 오전 10시 00분",
    depart_addr: "경기도 성남시 탄청상로",
    arrival_addr: "서울 강남구 테헤란로",
    load_rate: "30%",
  },
  {
    id: 3,
    names: "홍길동",
    tons: "1톤",
    loaddate: "2022-09-12 오전 10시 00분",
    unloaddate: "2022-09-12 오전 10시 00분",
    depart_addr: "경기도 성남시 탄청상로",
    arrival_addr: "서울 강남구 테헤란로",
    load_rate: "30%",
  },
];

// 팝업용 끝

const images = [
  {
    original: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    thumbnail: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  },
  {
    original: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    thumbnail: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  },
  {
    original: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    thumbnail: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  },
  {
    original: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    thumbnail: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  },
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

// 화물 데이타
const cargocolumns = [
  {
    field: "id",
    headerName: "화물ID",
    width: 100,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "cargo_name",
    headerName: "화물명칭",
    width: 250,
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
    status: "차량검색중",
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
    status: "차량검색중",
  },
];

function Matching() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [values, setValues] = React.useState({
    price: "",
    add_price: "",
    rec_phone: "",
    weight: "",
    height: "",
    cwidth: "",
    cvertical: "",
    loadmethod: "FL",
    unloadmethod: "HJ",
    cdate: "",
  });
  const inputhandleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const [radius, setRadius] = React.useState("5");

  const radiusHandleChange = (prop) => (event) => {
    setRadius({ radius, [prop]: event.target.value });
    //선택 시 바로 저장
  };

  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const handleRowClick = (params) => {
    setMessage(`Row ID "${params.row.id}" clicked`);
  };

  const handleCargoRowClick = (params) => {
    setMessage(`cargo Row ID "${params.row.id}" clicked`);
    setVisible(true);
  };

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 팝업용
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleClick = (params) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [svalues, setSvalues] = React.useState({
    startdate: "",
    enddate: "",
    owner_name: "",
    cargo_name: "",
    statu: "RO",
  });

  const searchHandleChange = (prop) => (event) => {
    setSvalues({ ...svalues, [prop]: event.target.value });
  };
  // 팝업용 끝

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* 테이블 그리기 */}

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
                            onChange={searchHandleChange("startdate")}
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
                            onChange={searchHandleChange("enddate")}
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
                            onChange={searchHandleChange("owner_name")}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={2}>
                        <Stack component="form" noValidate spacing={1}>
                          <TextField
                            id="cargo_name"
                            value={svalues.cargo_name}
                            label="화물명칭"
                            size="small"
                            sx={{ m: 1, width: "25ch" }}
                            onChange={searchHandleChange("cargo_name")}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={2}>
                        <FormControl sx={{ m: 1, minWidth: 180 }}>
                          <Select
                            sx={{ height: 40, minWidth: 180 }}
                            id="statu"
                            size="small"
                            value={svalues.statu}
                            onChange={searchHandleChange("statu")}
                          >
                            <MenuItem value={"RO"}>준비/등록중</MenuItem>
                            <MenuItem value={"MO"}>최적차량검색중</MenuItem>
                            <MenuItem value={"MF"}>매칭완료</MenuItem>
                            <MenuItem value={"TO"}>운송중</MenuItem>
                            <MenuItem value={"TF"}>운송완료</MenuItem>
                            <MenuItem value={"TN"}>운송취소</MenuItem>
                            <MenuItem value={"LC"}>상차와료</MenuItem>
                            <MenuItem value={"UC"}>하차완료</MenuItem>
                          </Select>
                        </FormControl>
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
      {/* 검색조건 끝 */}

      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <Card>
              <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <MDBox>
                  <MDTypography variant="h6" gutterBottom>
                    화물등록 내역
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
                  pageSize={10}
                  rowsPerPageOptions={[10]}
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

      {/* 상세페이지 시작 */}

      <Divider />
      {visible && (
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
                              요금
                            </MDTypography>
                          </Grid>

                          <Grid item xs={4}>
                            <TextField
                              id="price"
                              value={values.price}
                              onChange={inputhandleChange("price")}
                              sx={{ m: 1, width: "25ch" }}
                              size="small"
                              InputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                                endAdornment: <InputAdornment position="end">원</InputAdornment>,
                              }}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                              추가요금
                            </MDTypography>
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              id="add_price"
                              value={values.add_price}
                              size="small"
                              sx={{ m: 1, width: "25ch" }}
                              onChange={inputhandleChange("add_price")}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">원</InputAdornment>,
                              }}
                            />
                          </Grid>

                          <Grid item xs={2}>
                            <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                              상차방법
                            </MDTypography>
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl sx={{ m: 1, minWidth: 180 }}>
                              <Select
                                sx={{ height: 40, minWidth: 180 }}
                                id="loadmethod"
                                value={values.loadmethod}
                                onChange={inputhandleChange("loadmethod")}
                              >
                                <MenuItem value={"HJ"}>수작업</MenuItem>
                                <MenuItem value={"FL"}>지게차</MenuItem>
                                <MenuItem value={"CR"}>크레인</MenuItem>
                                <MenuItem value={"HT"}>호이스트</MenuItem>
                                <MenuItem value={"CV"}>컨베이어</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={2}>
                            <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                              하차방법
                            </MDTypography>
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl sx={{ m: 1, minWidth: 180 }}>
                              <Select
                                sx={{ height: 40, minWidth: 180 }}
                                id="unloadmethod"
                                value={values.unloadmethod}
                                onChange={inputhandleChange("unloadmethod")}
                              >
                                <MenuItem value={"HJ"}>수작업</MenuItem>
                                <MenuItem value={"FL"}>지게차</MenuItem>
                                <MenuItem value={"CR"}>크레인</MenuItem>
                                <MenuItem value={"HT"}>호이스트</MenuItem>
                                <MenuItem value={"CV"}>컨베이어</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={2}>
                            <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                              수취인정보
                            </MDTypography>
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              id="rec_phone"
                              value={values.rec_phone}
                              size="small"
                              sx={{ m: 1, width: "25ch" }}
                              onChange={inputhandleChange("rec_phone")}
                              InputProps={{
                                endAdornment: <InputAdornment position="end"></InputAdornment>,
                              }}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                              중량
                            </MDTypography>
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              id="weight"
                              value={values.weight}
                              size="small"
                              sx={{ m: 1, width: "25ch" }}
                              onChange={inputhandleChange("weight")}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">KG</InputAdornment>,
                              }}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                              높이
                            </MDTypography>
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              id="height"
                              value={values.height}
                              size="small"
                              sx={{ m: 1, width: "25ch" }}
                              onChange={inputhandleChange("height")}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">M</InputAdornment>,
                              }}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                              가로
                            </MDTypography>
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              id="cwidth"
                              value={values.cwidth}
                              size="small"
                              sx={{ m: 1, width: "25ch" }}
                              onChange={inputhandleChange("cwidth")}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">M</InputAdornment>,
                              }}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                              세로
                            </MDTypography>
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              id="cvertical"
                              value={values.cvertical}
                              size="small"
                              sx={{ m: 1, width: "25ch" }}
                              onChange={inputhandleChange("cvertical")}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">M</InputAdornment>,
                              }}
                            />
                          </Grid>

                          <Grid item xs={2}>
                            <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                              요청사항
                            </MDTypography>
                          </Grid>
                          <Grid item xs={4}>
                            <MDTypography gutterBottom variant="body2">
                              안전하게 배송해 주세요
                            </MDTypography>
                          </Grid>
                          <Grid item xs={2}>
                            <MDTypography gutterBottom variant="body2" style={{ fontWeight: 600 }}>
                              상태
                            </MDTypography>
                          </Grid>
                          <Grid item xs={4}>
                            <Grid item xs={2}>
                              <Stack direction="row" spacing={1}>
                                <Chip label="차량검색중" color="success" />
                              </Stack>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            <Grid item xs={2} md={3} lg={4}>
              <MDBox py={3} alignItems="center" justifyContent="center">
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Box sx={{ width: "100%" }}>
                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                          <Grid item xs={3}>
                            <MDTypography gutterBottom variant="h5" component="div">
                              매칭
                            </MDTypography>
                          </Grid>
                          <Grid item xs={3}>
                            <Button
                              variant="contained"
                              onClick={handleClick}
                              color="success"
                              size="small"
                            >
                              차주매칭
                            </Button>
                          </Grid>
                        </Grid>
                        <Divider />
                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                          <Grid item xs={3}>
                            <MDTypography gutterBottom variant="h5" component="div">
                              검색반경
                            </MDTypography>
                          </Grid>
                          <Grid item xs={3}>
                            <FormControl sx={{ minWidth: 180 }}>
                              <Select
                                sx={{ height: 40, minWidth: 180 }}
                                id="radius"
                                value={radius.radiusValue}
                                onChange={radiusHandleChange("radius")}
                              >
                                <MenuItem value={"5"}>5KM</MenuItem>
                                <MenuItem value={"10"}>10KM</MenuItem>
                                <MenuItem value={"15"}>15KM</MenuItem>
                                <MenuItem value={"20"}>20KM</MenuItem>
                                <MenuItem value={"25"}>25KM</MenuItem>
                                <MenuItem value={"30"}>30KM</MenuItem>
                                <MenuItem value={"35"}>35KM</MenuItem>
                                <MenuItem value={"40"}>40KM</MenuItem>
                                <MenuItem value={"45"}>45KM</MenuItem>
                                <MenuItem value={"50"}>50KM</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={6} md={7} lg={8}>
              <MDBox py={3} alignItems="center" justifyContent="center">
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Box sx={{ width: "100%" }}>
                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                          <Grid item xs={2}>
                            <MDTypography gutterBottom variant="h5" component="div">
                              차주성명
                            </MDTypography>
                          </Grid>
                          <Grid item xs={2}>
                            <MDTypography gutterBottom variant="h5" component="div">
                              xxxx
                            </MDTypography>
                          </Grid>
                        </Grid>
                        <Divider />
                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                          <Grid item xs={2}>
                            <MDTypography gutterBottom variant="h5" component="div">
                              차주 연락처
                            </MDTypography>
                          </Grid>

                          <Grid item xs={2}>
                            <MDTypography gutterBottom variant="h5" component="div">
                              010-1234-4567
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
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            <Grid item xs={6} md={6} lg={12}>
              <MDBox py={3} alignItems="center" justifyContent="center">
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <MDTypography gutterBottom variant="h5" component="div">
                        상차지이미지
                      </MDTypography>
                      <ImageGallery items={images} />;
                    </CardContent>
                  </CardActionArea>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      )}
      {/* 상세정보 끝 */}

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
                maxWidth: "1000px", // Set your width here
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
                              차주정보
                            </MDTypography>
                            <Box sx={{ width: "100%" }}>
                              <Grid container>
                                <div style={{ height: 400, width: "100%" }}>
                                  <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    autoHeight
                                    getRowHeight={() => "auto"}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                  />
                                </div>
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
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" size="small" onClick={handleClose}>
              저장
            </Button>
            <Button variant="contained" color="secondary" size="small" onClick={handleClose}>
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

export default Matching;
