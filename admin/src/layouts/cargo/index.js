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

import FormControl from "@mui/material/FormControl";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useMaterialUIController } from "context";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import cargocolumns from "./test/cargocolumns.json";
import cargorows from "./test/cargorows.json";

import {
  searchRequest
} from "api/cargo";

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
// 팝업 끝

const Truckowner = () => {
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

  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleRowClick = (params) => {
    setMessage(`Row ID "${params.row.id}" clicked`);
  };

  const handleCargoRowClick = (params) => {
    setMessage(`cargo Row ID "${params.row.id}" clicked`);
    setOpen(true);
  };
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [svalues, setSvalues] = React.useState({
    startdate: "",
    enddate: "",
    owner_name: "",
    car_no: "",
  });

  const searchHandleChange = (prop) => (event) => {
    setSvalues({ ...svalues, [prop]: event.target.value });
  };
  // 아래는 팝업용

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    searchRequest()
    .then(res => {
      console.log(res)
    })
  }, [])

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
                            id="car_no"
                            value={svalues.car_no}
                            label="차량번호"
                            size="small"
                            sx={{ m: 1, width: "25ch" }}
                            onChange={searchHandleChange("car_no")}
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
      {/* 검색조건 끝 */}

      {/* 테이블 그리기 */}

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
      {open && (
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
                              운송완료일
                            </MDTypography>
                          </Grid>
                          <Grid item xs={4}>
                            <Stack component="form" noValidate spacing={3}>
                              <TextField
                                id="datetime-local"
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                value={values.cdate}
                                sx={{ m: 1, width: 200 }}
                                onChange={inputhandleChange("cdate")}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Stack>
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
                            <Stack direction="row" spacing={1}>
                              <Chip label="운송완료" color="primary" />
                            </Stack>
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                  <MDBox alignItems="right" justifyContent="right">
                    <CardActions>
                      <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="info" size="small">
                          저장
                        </Button>
                      </Box>
                    </CardActions>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            <Grid item xs={6} md={6} lg={6}>
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
            <Grid item xs={6} md={6} lg={6}>
              <MDBox py={3} alignItems="center" justifyContent="center">
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <MDTypography gutterBottom variant="h5" component="div">
                        하차지이미지
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
      {/* 팝업 끝 */}
      <Footer />
    </DashboardLayout>
  );
}

export default Truckowner;
