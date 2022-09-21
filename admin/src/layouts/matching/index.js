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

import columns from "./json/columns.json";
import cargocolumns from "./json/cargocolumns.json";

import {
  getRequestsForMatching
} from "api/matching";
import { 
  formatFare
} from "utils/commonUtils";
import {
  nowDateTime,
  formatInKorea
} from "utils/dateUtils";

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

const Matching = () => {
  const [controller] = useMaterialUIController()
  const { darkMode } = controller
  
  const [cargorows, setCargorows] = React.useState([])
  const [radius, setRadius] = React.useState("5")
  const [open, setOpen] = React.useState(false)
  const [visible, setVisible] = React.useState(false)
  const [search, setSearch] = React.useState({
    departDate: "",
    arrivalDate: "",
    phoneNumber: "",
    cargoName: "",
    status: "all",
  })
  const [values, setValues] = React.useState({
    reqId: 0,
    transitFare: 0,
    additionalFare: 0, 
    cargoownerName: "",
    receiverPhone: "",
    cweight: 0,
    cheight: 0,
    cwidth: 0,
    cverticalreal: 0,
    loadMethod: "FL",
    unloadMethod: "HJ",
    arrivalDatetimes: "",
    status: "",
    statusName: "",
    images: [],
  })

  React.useEffect(() => {
    getRequestsForMatching(search)
    .then(res => {
      res.data.map((obj) => {
        obj.departDatetimes = formatInKorea(obj.departDatetimes)
        obj.arrivalDatetimes = formatInKorea(obj.arrivalDatetimes)
      })

      setCargorows(res.data)
    })
  }, [])

  const handleInputChange = (prop) => (event) => {
    let val = event.target.value

    if (prop === "transitFare" || prop === "additionalFare") {
      val = val.replace(/[^0-9]/g, "")
    }

    setValues({ ...values, [prop]: event.target.value })
  }

  const handleRadiusChange = (prop) => (event) => {
    setRadius({ radius, [prop]: event.target.value })
    //선택 시 바로 저장
  }

  const handleCargoRowClick = (params) => {
    const nextValue = {}
    Object.keys(values).forEach(key => nextValue[key] = params.row[key])

    setVisible(true)
    setValues({ ...nextValue })
  }

  const handleSearchRequest = () => {
    getRequestsForMatching(search)
    .then(res => {
      res.data.map((obj) => {
        obj.departDatetimes = formatInKorea(obj.departDatetimes)
        obj.arrivalDatetimes = formatInKorea(obj.arrivalDatetimes)
      })
      setCargorows(res.data)
    })
  }

  // 팝업용
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleClick = (params) => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  // 팝업용 끝

  const handleSearchChange = (prop) => (event) => {
    setSearch({ ...search, [prop]: event.target.value })
  }

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
                            id="departDate"
                            type="date"
                            label="출발일"
                            value={search.departDate}
                            sx={{ m: 1, width: 200 }}
                            onChange={handleSearchChange("departDate")}
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
                            id="arrivalDate"
                            type="date"
                            label="도착일"
                            value={search.arrivalDate}
                            sx={{ m: 1, width: 200 }}
                            onChange={handleSearchChange("arrivalDate")}
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
                            id="phoneNumber"
                            value={search.phoneNumber}
                            label="화주 휴대폰번호"
                            size="small"
                            sx={{ m: 1, width: "25ch" }}
                            onChange={handleSearchChange("phoneNumber")}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={2}>
                        <Stack component="form" noValidate spacing={1}>
                          <TextField
                            id="cargoName"
                            value={search.cargoName}
                            label="화물명"
                            size="small"
                            sx={{ m: 1, width: "25ch" }}
                            onChange={handleSearchChange("cargo_name")}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={2}>
                        <FormControl sx={{ m: 1, minWidth: 180 }}>
                          <Select
                            sx={{ height: 40, minWidth: 180 }}
                            id="status"
                            size="small"
                            value={search.status}
                            onChange={handleSearchChange("status")}
                          >
                            <MenuItem value={"all"}>전체</MenuItem>
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
                          <Button variant="contained" size="small" color="info" onClick={handleSearchRequest}>
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
                  getRowId={obj => obj.reqId}
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
                              id="transitFare"
                              value={formatFare(values.transitFare)}
                              onChange={handleInputChange("transitFare")}
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
                              id="additionalFare"
                              value={formatFare(values.additionalFare)}
                              size="small"
                              sx={{ m: 1, width: "25ch" }}
                              onChange={handleInputChange("additionalFare")}
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
                                id="loadMethod"
                                value={values.loadMethod.trim()}
                                onChange={handleInputChange("loadMethod")}
                              >
                                <MenuItem value="">없음</MenuItem>
                                <MenuItem value="HJ">수작업</MenuItem>
                                <MenuItem value="FL">지게차</MenuItem>
                                <MenuItem value="CR">크레인</MenuItem>
                                <MenuItem value="HT">호이스트</MenuItem>
                                <MenuItem value="CV">컨베이어</MenuItem>
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
                                id="unloadMethod"
                                value={values.unloadMethod.trim()}
                                onChange={handleInputChange("unloadMethod")}
                              >
                                <MenuItem value="">없음</MenuItem>
                                <MenuItem value="HJ">수작업</MenuItem>
                                <MenuItem value="FL">지게차</MenuItem>
                                <MenuItem value="CR">크레인</MenuItem>
                                <MenuItem value="HT">호이스트</MenuItem>
                                <MenuItem value="CV">컨베이어</MenuItem>
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
                              id="receiverPhone"
                              value={values.receiverPhone}
                              size="small"
                              sx={{ m: 1, width: "25ch" }}
                              onChange={handleInputChange("receiverPhone")}
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
                              id="cweight"
                              value={values.cweight}
                              size="small"
                              sx={{ m: 1, width: "25ch" }}
                              onChange={handleInputChange("cweight")}
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
                              id="cheight"
                              value={values.cheight}
                              size="small"
                              sx={{ m: 1, width: "25ch" }}
                              onChange={handleInputChange("cheight")}
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
                              onChange={handleInputChange("cwidth")}
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
                              id="cverticalreal"
                              value={values.cverticalreal}
                              size="small"
                              sx={{ m: 1, width: "25ch" }}
                              onChange={handleInputChange("cverticalreal")}
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
                              <div style={{ marginLeft: "8px" }}>
                                안전하게 배송해 주세요
                              </div>
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
                                <div style={{ marginLeft: "8px" }}>
                                  <Chip label="차량검색중" color="success" />
                                </div>
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
                                value={radius}
                                onChange={handleRadiusChange("radius")}
                              >
                                <MenuItem value="5">5KM</MenuItem>
                                <MenuItem value="10">10KM</MenuItem>
                                <MenuItem value="15">15KM</MenuItem>
                                <MenuItem value="20">20KM</MenuItem>
                                <MenuItem value="25">25KM</MenuItem>
                                <MenuItem value="30">30KM</MenuItem>
                                <MenuItem value="35">35KM</MenuItem>
                                <MenuItem value="40">40KM</MenuItem>
                                <MenuItem value="45">45KM</MenuItem>
                                <MenuItem value="50">50KM</MenuItem>
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
                              {values.cargoownerName === null ? "없음" : values.cargoownerName}
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
                              {values.receiverPhone === "" ? "없음" : values.receiverPhone}
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
                        화물이미지
                      </MDTypography>
                      <ImageGallery items={values.images} showFullscreenButton={values.images.length > 0} showPlayButton={false} />
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
