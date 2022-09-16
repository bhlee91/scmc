import * as React from "react";

import DashboardLayout from "pages/LayoutContainers/DashboardLayout";
import DashboardNavbar from "pages/Navbars/DashboardNavbar";
import Footer from "pages/Footer";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import Stack from "@mui/material/Stack";

import { Card, CardContent, CardActionArea } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import Icon from "@mui/material/Icon";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";
import Button from "components/MDButton";
import DownloadIcon from "@mui/icons-material/Download";
import MDBox from "components/MDBox";

// 파업용 시작
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Tooltip from "@mui/material/Tooltip";

const columns = [
  { field: "id", headerName: "ID", width: 80, headerClassName: "super-app-theme--header" },
  {
    field: "banner_image_path",
    headerName: "img",
    width: 100,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      return (
        <div alignItems="center">
          <img src={params.row.banner_image_path} alt="" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "banner_name",
    headerName: "배너명",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "banner_startdt",
    headerName: "배너게시시작일",
    width: 200,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "banner_enddt",
    headerName: "배너게시종료일",
    width: 150,
    editable: true,
    headerClassName: "super-app-theme--header",
  },

  {
    field: "banner_desc",
    headerName: "배너설명",
    width: 200,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <Tooltip title={params.row.banner_desc}>
        <span className="table-cell-trucate">{params.row.banner_desc}</span>
      </Tooltip>
    ),
  },
  {
    field: "banner_url",
    headerName: "배너URL",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "banner_expdiv",
    headerName: "배너노출채널",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "banner_width",
    headerName: "배너 width",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "banner_height",
    headerName: "배너 Height",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "banner_order",
    headerName: "배너노출순서",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "banner_useyn",
    headerName: "사용유무",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "reg_id",
    headerName: "등록자",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "reg_dt",
    headerName: "등록일",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "mod_id",
    headerName: "수정자",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "mod_dt",
    headerName: "수정일",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
];

const rows = [
  {
    id: 1,
    banner_image_path: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    banner_name: "모바일 Banner",
    banner_startdt: "2022-09-16 00:00:00",
    banner_enddt: "2023-09-15 00:00:00",
    banner_desc: "모바일 기본 배너",
    banner_url: "http://",
    banner_expdiv: "APP",
    banner_width: "250",
    banner_height: "350",
    banner_order: "1",
    banner_useyn: "Y",
    reg_id: "admin",
    reg_dt: "2022-09-16",
    mod_id: "-",
    mod_dt: "-",
  },
  {
    id: 2,
    banner_image_path: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    banner_name: "모바일 Banner",
    banner_startdt: "2022-09-16 00:00:00",
    banner_enddt: "2023-09-15 00:00:00",
    banner_desc: "모바일 기본 배너",
    banner_url: "http://",
    banner_expdiv: "APP",
    banner_width: "250",
    banner_height: "350",
    banner_order: "1",
    banner_useyn: "Y",
    reg_id: "admin",
    reg_dt: "2022-09-16",
    mod_id: "-",
    mod_dt: "-",
  },
  {
    id: 3,
    banner_image_path: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",

    banner_name: "모바일 Banner",
    banner_startdt: "2022-09-16 00:00:00",
    banner_enddt: "2023-09-15 00:00:00",
    banner_desc: "모바일 기본 배너",
    banner_url: "http://",
    banner_expdiv: "APP",
    banner_width: "250",
    banner_height: "350",
    banner_order: "1",
    banner_useyn: "Y",
    reg_id: "admin",
    reg_dt: "2022-09-16",
    mod_id: "-",
    mod_dt: "-",
  },
];

function Banner() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //  팝

  const [values, setValues] = React.useState({
    banner_name: "",
    banner_startdt: "",
    banner_enddt: "",
    banner_desc: "",
    banner_url: "",
    banner_expdiv: "",
    banner_width: "",
    banner_height: "",
    banner_image_path: "",
    banner_useyn: "Y",
  });
  const inputhandleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  // 상세정보 끝

  const [message, setMessage] = React.useState("");
  const handleRowClick = (params) => {
    setMessage(`Row ID "${params.row.id}" clicked`);
    setOpen(true);
  };

  return (
    <MDBox>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <MDBox
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
            pageSize={5}
            rowsPerPageOptions={[5]}
            rowSpacingType="border"
            density="compact"
            onRowClick={handleRowClick}
            sx={{ fontSize: 14, fontFamily: "-apple-system", fontWeight: 400 }}
          />
        </MDBox>
      </Stack>
      <Divider />

      <Grid container>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button color="info" onClick={handleClick}>
              등록
            </Button>
          </Box>
        </Grid>
      </Grid>
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
          <DialogTitle id="responsive-dialog-title">상품</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <MDBox py={3}>
                <Grid container spacing={1} alignItems="center" justifyContent="center">
                  <Grid item xs={12} md={6} lg={12}>
                    <MDBox alignItems="center" justifyContent="center">
                      <Card>
                        <CardActionArea>
                          <CardContent>
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
                                    배너명
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="banner_name"
                                    value={values.banner_name}
                                    onChange={inputhandleChange("banner_name")}
                                    size="small"
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    배너설명
                                  </MDTypography>
                                </Grid>
                                <Divider />
                                <Grid item xs={4}>
                                  <TextField
                                    id="banner_name"
                                    value={values.banner_name}
                                    onChange={inputhandleChange("banner_name")}
                                    size="small"
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    배너게시시작일
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Stack component="form" noValidate spacing={1}>
                                    <TextField
                                      id="date"
                                      type="date"
                                      label="배너게시시작일"
                                      defaultValue="2017-05-24"
                                      value={values.banner_startdt}
                                      sx={{ m: 1, width: 200 }}
                                      onChange={inputhandleChange("banner_startdt")}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      size="small"
                                    />
                                  </Stack>
                                </Grid>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    배너게시종료일
                                  </MDTypography>
                                </Grid>

                                <Grid item xs={4}>
                                  <Stack component="form" noValidate spacing={1}>
                                    <TextField
                                      id="date"
                                      type="date"
                                      label="배너게시종료일"
                                      defaultValue="2017-05-24"
                                      value={values.banner_enddt}
                                      sx={{ m: 1, width: 200 }}
                                      onChange={inputhandleChange("banner_enddt")}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      size="small"
                                    />
                                  </Stack>
                                </Grid>

                                <Divider />

                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    노출채널
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl sx={{ m: 1, minWidth: 180 }}>
                                    <Select
                                      sx={{ height: 40, minWidth: 180 }}
                                      id="expdiv"
                                      value={values.terms_type}
                                      onChange={inputhandleChange("expdiv")}
                                      size="small"
                                      fullwidth
                                    >
                                      <MenuItem value={"MAPP"}>APP</MenuItem>
                                      <MenuItem value={"MWEb"}>모바일웹</MenuItem>
                                      <MenuItem value={"PWEB"}>PC WEB</MenuItem>
                                      <MenuItem value={"ALLE"}>모든채널</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    배너 URL
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="banner_url"
                                    value={values.banner_name}
                                    onChange={inputhandleChange("banner_url")}
                                    size="small"
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    배너 Width
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="banner_width"
                                    value={values.banner_name}
                                    onChange={inputhandleChange("banner_width")}
                                    size="small"
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    배너 Height
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="banner_height"
                                    value={values.banner_name}
                                    onChange={inputhandleChange("banner_height")}
                                    size="small"
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    노출순서
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl sx={{ m: 1, minWidth: 180 }}>
                                    <Select
                                      sx={{ height: 40, minWidth: 180 }}
                                      id="banner_order"
                                      value={values.banner_order}
                                      onChange={inputhandleChange("banner_order")}
                                      size="small"
                                      fullwidth
                                    >
                                      <MenuItem value={"1"}>1</MenuItem>
                                      <MenuItem value={"2"}>2</MenuItem>
                                      <MenuItem value={"3"}>3</MenuItem>
                                      <MenuItem value={"4"}>4</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>

                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    상태
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl>
                                    <RadioGroup
                                      row
                                      id="banner_useyn"
                                      value={values.LORYN}
                                      onChange={inputhandleChange("banner_useyn")}
                                    >
                                      <FormControlLabel
                                        value="Y"
                                        control={<Radio />}
                                        label="사용"
                                      />
                                      <FormControlLabel
                                        value="N"
                                        control={<Radio />}
                                        label="미사용"
                                      />
                                    </RadioGroup>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    배너 이미지
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Stack direction="row" alignItems="center" spacing={2}>
                                    <Button variant="contained" color="success" component="label">
                                      Upload
                                      <input hidden accept="image/*" multiple type="file" />
                                    </Button>
                                  </Stack>
                                </Grid>
                                <Grid item xs={4}>
                                  <div alignItems="center">
                                    <img
                                      width-="300px"
                                      height="150px"
                                      object-fit="cover"
                                      src="https://images.unsplash.com/photo-1522770179533-24471fcdba45"
                                      alt=""
                                    />
                                  </div>
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
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              variant="contained"
              color="info"
              component="label"
              onClick={handleClose}
            >
              저장
            </Button>
            <Button
              autoFocus
              variant="contained"
              color="info"
              component="label"
              onClick={handleClose}
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </MDBox>
  );
}

export default Banner;
