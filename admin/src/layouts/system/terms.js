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

// 팝업용 시작
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

import columns from "./json/termsColumns";
import {
  getTermsInfo,
  setTermsInfo
} from "api/system/index";
import store from "store";

const Terms = () => {
  const [controller] = useMaterialUIController()
  const { darkMode } = controller



  const [open, setOpen] = React.useState(false)
  const [rows, setRows] = React.useState([])
  const [values, setValues] = React.useState({
    termsUid: 0,
    termsType: "",
    versions: "",
    contents: "",
    expDiv: "",
    useYn: "Y",
  })

  const searchTerms = () => {
    getTermsInfo()
    .then(res => {
      setRows(res.data)
    })
  }

  React.useEffect(() => {
    searchTerms()
  }, [])

  const handleClick = () => {
    setOpen(true)
  }

  const handleSave = () => {
    const regId = store.getState().user.email === "" ? "ADMIN" : store.getState().user.email

    const obj = {
      ...values,
      regId: regId
    }

    console.log(obj)

    setTermsInfo(obj)
    .then(() => {
      setOpen(false)
      setValues({
        termsUid: 0,
        termsType: "",
        versions: "",
        contents: "",
        expDiv: "",
        useYn: "Y",
      })
      searchTerms()
    })

  }

  const handleClose = () => {
    setOpen(false)
    setValues({
      termsType: "",
      versions: "",
      contents: "",
      expDiv: "",
      useYn: "Y",
    })
  }
  //  팝

  const handleInputChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  // 상세정보 끝

  const handleRowClick = (params) => {
    const selectValue = {}
    Object.keys(values).forEach(key => selectValue[key] = params.row[key])

    setValues({ ...selectValue })
    setOpen(true)
  }

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
            getRowId={row => row.termsUid}
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
                                      id="termsType"
                                      value={values.termsType}
                                      onChange={handleInputChange("termsType")}
                                      size="small"
                                    >
                                      <MenuItem value="T01">운송약관</MenuItem>
                                      <MenuItem value="T02">이용약관</MenuItem>
                                      <MenuItem value="T03">개인정보보호방침</MenuItem>
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
                                    id="versions"
                                    value={values.versions}
                                    onChange={handleInputChange("versions")}
                                    size="small"
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
                                      id="expDiv"
                                      value={values.expDiv}
                                      onChange={handleInputChange("expDiv")}
                                      size="small"
                                    >
                                      <MenuItem value="MAPP">APP</MenuItem>
                                      <MenuItem value="MWEb">모바일웹</MenuItem>
                                      <MenuItem value="PWEB">PC WEB</MenuItem>
                                      <MenuItem value="ALLE">모든채널</MenuItem>
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
                                      id="useYn"
                                      value={values.useYn}
                                      onChange={handleInputChange("useYn")}
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
                                  <FormControl>
                                    <TextareaAutosize
                                      aria-label="minimum height"
                                      minRows={100}
                                      style={{ width: 600, height: 1200 }}
                                      value={values.contents}
                                      onChange={handleInputChange("contents")}
                                    />
                                  </FormControl>
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
              onClick={handleSave}
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
