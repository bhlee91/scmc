import * as React from "react";
import { Box, Link, Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        웹사이트
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function footer() {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        GNO 소프트웨어
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        주소
      </Typography>
      <Copyright />
    </Box>
  );
}

export default footer;
