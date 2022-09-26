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

import columns from "./json/paymgmtColumns";

const rows = [
  {
    id: 1,
    product_name: "테스트 상품 ",
    price: "10,000원",
    discount_rate: "",
    product_startdt: "2022-09-10 00:00:00",
    product_enddt: "2023-09-10 00:00:00",
    useyn: "Y",
  },
  {
    id: 2,
    product_name: "3개월 할인 상품",
    price: "27,000원",
    discount_rate: "10%",
    product_startdt: "2022-09-10 00:00:00",
    product_enddt: "2023-09-10 00:00:00",
    useyn: "Y",
  },
  {
    id: 3,
    product_name: "6개월 할인 상품",
    price: "48,000원",
    discount_rate: "20%",
    product_startdt: "2022-09-10 00:00:00",
    product_enddt: "2023-09-10 00:00:00",
    useyn: "N",
  },
];

const Paymgmt = () => {
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
    product_name: "",
    price: "",
    discount_rate: "",
    product_startdt: "",
    product_enddt: "",
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
                                    상품명
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="product_name"
                                    value={values.product_name}
                                    onChange={inputhandleChange("product_name")}
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
                                    onChange={inputhandleChange("price")}
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
                                    할인율
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="discount_rate"
                                    value={values.desc}
                                    onChange={inputhandleChange("discount_rate")}
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
                                    서비스시작일
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="datetime-local"
                                    type="datetime-local"
                                    defaultValue="2017-05-24T10:30"
                                    value={values.cdate}
                                    onChange={inputhandleChange("product_startdt")}
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
                                    id="datetime-local"
                                    type="datetime-local"
                                    defaultValue="2017-05-24T10:30"
                                    value={values.cdate}
                                    size="small"
                                    onChange={inputhandleChange("product_enddt")}
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

export default Paymgmt;
