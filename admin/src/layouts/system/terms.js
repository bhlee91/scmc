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
  { field: "id", headerName: "ID", width: 130, headerClassName: "super-app-theme--header" },
  {
    field: "terms_type",
    headerName: "약관 Type",
    width: 200,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "versions",
    headerName: "버전",
    width: 150,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "contents",
    headerName: "내용",
    width: 150,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <Tooltip title={params.row.contents}>
        <span className="table-cell-trucate">{params.row.contents}</span>
      </Tooltip>
    ),
  },
  {
    field: "expdiv",
    headerName: "노출채널",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "useyn",
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
    terms_type: "운송약관 ",
    versions: "1.0",
    contents:
      "운송약관 내용 열라 많다....ㅎㅎㅎ ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ",
    expdiv: "ALLE",
    useyn: "Y",
    reg_id: "admin",
    reg_dt: "2022-09-16",
    mod_id: "-",
    mod_dt: "-",
  },
  {
    id: 2,
    terms_type: "이용약관 ",
    versions: "1.0",
    contents: "이용약관",
    expdiv: "ALLE",
    useyn: "Y",
    reg_id: "admin",
    reg_dt: "2022-09-16",
    mod_id: "-",
    mod_dt: "-",
  },
  {
    id: 3,
    terms_type: "개읹정보보호방침 ",
    versions: "1.0",
    contents: "개읹정보보호방침",
    expdiv: "ALLE",
    useyn: "Y",
    reg_id: "admin",
    reg_dt: "2022-09-16",
    mod_id: "-",
    mod_dt: "-",
  },
];

function Terms() {
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
    terms_type: "T01",
    versions: "",
    contents: "",
    expdiv: "",
    useyn: "Y",
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
                maxWidth: "800px", // Set your width here
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
                                    약관 Type
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl sx={{ m: 1, minWidth: 180 }}>
                                    <Select
                                      sx={{ height: 40, minWidth: 180 }}
                                      id="terms_type"
                                      value={values.terms_type}
                                      onChange={inputhandleChange("terms_type")}
                                      size="small"
                                      fullwidth
                                    >
                                      <MenuItem value={"T01"}>운송약관</MenuItem>
                                      <MenuItem value={"T02"}>이용약관</MenuItem>
                                      <MenuItem value={"T03"}>개인정보보호방침</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    버전
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="version"
                                    value={values.version}
                                    onChange={inputhandleChange("version")}
                                    size="small"
                                    fullWidth
                                  />
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
                                    상태
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl>
                                    <RadioGroup
                                      row
                                      id="useyn"
                                      value={values.LORYN}
                                      onChange={inputhandleChange("useyn")}
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
                                    내용
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={8}>
                                  <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={100}
                                    placeholder=""
                                    style={{ width: 600 }}
                                  />
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

export default Terms;
