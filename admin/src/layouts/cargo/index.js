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

// 팝업용 시작
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

import cargocolumns from "./json/cargocolumns.json";
import images from "./json/images.json";

import {
  searchAllRequest,
  saveRequestFare
} from "api/cargo";
import { 
  formatFare
} from "utils/commonUtils";
import {
  formatInKorea,
  formatStringToDateTime
} from "utils/dateUtils";

const Cargo = () => {
  const [controller] = useMaterialUIController()
  const { darkMode } = controller

  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([])
  const [search, setSearch] = React.useState({
    departDate: "",
    arrivalDate: "",
    phoneNumber: "",
    status: "all",
  })
  const [values, setValues] = React.useState({
    reqId: 0,
    transitFare: 0,
    additionalFare: 0,
    receiverPhone: "",
    cweight: "",
    cheight: "",
    cwidth: "",
    cverticalreal: "",
    loadMethod: "",
    unloadMethod: "",
    departDatetimes: "",
    arrivalDatetimes: "",
    status: "",
    statusName: "",
    regId: "ADMIN"
  })

  React.useEffect(() => {
    searchAllRequest(search)
    .then(res => {
      res.data.map((obj) => {
        obj.departDatetimes = formatInKorea(obj.departDatetimes)
        obj.arrivalDatetimes = formatInKorea(obj.arrivalDatetimes)
      })
      
      setRows(res.data)
    })
  }, [])

  const handleInputChange = (prop) => (event) => {
    let val = event.target.value

    if (prop === "transitFare" || prop === "additionalFare") {
      val = val.replace(/[^0-9]/g, "")
    }

    setValues({ ...values, [prop]: val })
  }

  const handleCargoRowClick = (params) => {
    const nextValue = {}
    Object.keys(values).forEach(key => nextValue[key] = params.row[key])
    
    setOpen(true)
    setValues({ ...nextValue })
  }

  const handleSearchChange = (prop) => (event) => {
    setSearch({ ...search, [prop]: event.target.value })
  }

  const handleSearchRequest = () => {
    searchAllRequest(search)
    .then(res => {
      res.data.map((obj) => {
        obj.departDatetimes = formatInKorea(obj.departDatetimes)
        obj.arrivalDatetimes = formatInKorea(obj.arrivalDatetimes)
      })
      setRows(res.data)
    })
  }

  const handleSaveRequest = () => {
    
    if (confirm("저장하겠습니까?")) {
      saveRequestFare(values)
      .then(res => {
        res.data === 1 ? alert("저장되었습니다.") : alert("저장에 실패했습니다.")
      })
      .then(() => {
        location.reload()
      })
    }
  }
  
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
                          <Select
                            id="status"
                            value={search.status}
                            label="상태"
                            size="small"
                            sx={{ m: 1, height: 37.25, width: "25ch" }}
                            onChange={handleSearchChange("status")}
                          >
                            <MenuItem value="all">전체</MenuItem>
                            <MenuItem value="RO">준비/등록중</MenuItem>
                            <MenuItem value="MO">최적차량검색</MenuItem>
                            <MenuItem value="MF">매칭완료</MenuItem>
                            <MenuItem value="LC">상차완료</MenuItem>
                            <MenuItem value="TO">운송중</MenuItem>
                            <MenuItem value="UC">하차완료</MenuItem>
                            <MenuItem value="TF">운송완료</MenuItem>
                            <MenuItem value="TN">운송취소</MenuItem>
                          </Select>
                        </Stack>
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
                      &nbsp;<strong>총 {rows.length} 건</strong> 이 있습니다.
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
                  getRowId={(row) => row.reqId}
                  autoHeight
                  rows={rows}
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
                              id="transitFare"
                              value={formatFare(values.transitFare)}
                              onChange={handleInputChange("transitFare")}
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
                              운송완료일
                            </MDTypography>
                          </Grid>
                          <Grid item xs={4}>
                            <Stack component="form" noValidate spacing={3}>
                              <TextField
                                id="datetime-local"
                                type="datetime-local"
                                value={formatStringToDateTime(values.arrivalDatetimes)}
                                sx={{ m: 1, width: 200 }}
                                onChange={handleInputChange("arrivalDatetimes")}
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
                            <Stack direction="row" spacing={1}>
                              <div style={{ marginLeft: "8px" }}>
                                <Chip label={values.statusName} color="primary" />
                              </div>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                  <MDBox alignItems="right" justifyContent="right">
                    <CardActions>
                      <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="info" size="small" onClick={handleSaveRequest}>
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
                      <ImageGallery items={images} />
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
                      <ImageGallery items={images} />
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

export default Cargo;
