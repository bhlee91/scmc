import * as React from "react";

import Stack from "@mui/material/Stack";

import { Card, CardContent, CardActionArea } from "@mui/material";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import Icon from "@mui/material/Icon";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";
import DataGrid from "react-data-grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "components/MDButton";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import MDBox from "components/MDBox";

const columns = [
  {
    key: "id",
    name: "id",
  },
  { key: "product", name: "상품" },
  { key: "total_cnt", name: "건수" },
  { key: "total_price", name: "금액" },
];

const rows = [
  { id: 0, product: "1개월 상품", total_cnt: "50", total_price: "500,000" },
  { id: 1, product: "2개월 상품", total_cnt: "50", total_price: "500,000" },
  { id: 2, product: "3개월 상품", total_cnt: "50", total_price: "500,000" },
  { id: 3, product: "6개월 상품", total_cnt: "50", total_price: "500,000" },
  { id: 4, product: "12개월 상품", total_cnt: "50", total_price: "500,000" },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Productsales = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [values, setValues] = React.useState({
    startdate: "",
    enddate: "",
    product_name: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClick = () => {};
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <MDBox py={3}>
          <Grid container spacing={1} alignItems="center" justifyContent="center">
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
                                id="startdate"
                                type="date"
                                label="시작일"
                                value={values.startdate}
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
                                id="enddate"
                                type="date"
                                label="종료일"
                                value={values.enddate}
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
                                id="product_name"
                                value={values.product_name}
                                label="상품명"
                                size="small"
                                sx={{ m: 1, width: "25ch" }}
                                onChange={handleChange("product_name")}
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
          </Grid>
          <Divider />
          <DataGrid align="center" columns={columns} rows={rows} />;
        </MDBox>
      </Box>
    </Box>
  );
}

export default Productsales;
