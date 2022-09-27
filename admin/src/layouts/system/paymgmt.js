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

// 팝업용
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
import InputAdornment from "@mui/material/InputAdornment";

import columns from "./json/paymgmtColumns";

import {
  getProductsInfo,
  setProductInfo
} from "api/system/index";
import { formatDate } from "utils/dateUtils";

const Paymgmt = () => {
  const [controller] = useMaterialUIController()
  const { darkMode } = controller

  const [open, setOpen] = React.useState(false)
  const [rows, setRows] = React.useState([])
  const [values, setValues] = React.useState({
    productUid: 0,
    productName: "",
    price: 0,
    discountRate: 0,
    productStartdt: "",
    productEnddt: "",
    useyn: "Y",
  })

  const handleClick = () => {
    setOpen(true)
  }

  const handleSave = () => {
    setProductInfo(values)
    .then(() => {
      setOpen(false)
      setValues({
        productUid: 0,
        productName: "",
        price: 0,
        discountRate: 0,
        productStartdt: "",
        productEnddt: "",
        useyn: "Y",
      })
      selectRow()
    })
  }

  const handleClose = () => {
    setOpen(false)
    setValues({
      productUid: 0,
      productName: "",
      price: 0,
      discountRate: 0,
      productStartdt: "",
      productEnddt: "",
      useyn: "Y",
    })
  }

  const handleInputChange = (prop) => (event) => {
    let val = event.target.value

    if (prop === "price") {
      val = val.replace(/[^0-9]/g, "")
    }

    if (prop === "productStartdt" || prop === "productEnddt") {
      val = formatDate(val)
    }

    setValues({ ...values, [prop]: val })
  }

  const handleRowClick = (params) => {
    const nextValue = {}
    Object.keys(values).forEach(key => {
      if (key === "productStartdt" || key === "productEnddt") {
        nextValue[key] = formatDate(params.row[key])
      } else {
        nextValue[key] = params.row[key]
      }
    })

    setOpen(true)
    setValues({ ...nextValue })
  }

  const selectRow = () => {
    getProductsInfo()
    .then(res => {
      res.data.map((obj, index) => {
        obj.id = index + 1
      })
      setRows(res.data)
    })
  }

  React.useEffect(() => {
    selectRow()
  }, [])

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
            getRowId={obj => obj.productUid}
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
                                    상품명
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="productName"
                                    value={values.productName}
                                    onChange={handleInputChange("productName")}
                                    fullWidth
                                    size="small"
                                  />
                                </Grid>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    가격
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="price"
                                    value={values.price}
                                    onChange={handleInputChange("price")}
                                    size="small"
                                    fullWidth
                                    InputProps={{
                                      endAdornment: <InputAdornment position="end">원</InputAdornment>,
                                    }}
                                  />
                                </Grid>

                                <Divider />

                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    할인율
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="discountRate"
                                    value={values.discountRate}
                                    onChange={handleInputChange("discountRate")}
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    서비스시작일
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="productStartdt"
                                    type="date"
                                    value={formatDate(values.productStartdt)}
                                    onChange={handleInputChange("productStartdt")}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    fullWidth
                                    size="small"
                                  />
                                </Grid>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    서비스종료일
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="productEnddt"
                                    type="date"
                                    value={formatDate(values.productEnddt)}
                                    size="small"
                                    onChange={handleInputChange("productEnddt")}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    fullWidth
                                  />
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
                                      value={values.useyn}
                                      onChange={handleInputChange("useyn")}
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

export default Paymgmt;
