import * as React from "react";
import Footer from "../common/Footer";
import Appbar from "../common/Appbar";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  createTheme,
  Divider,
  Grid,
  Paper,
  Stack,
  styled,
  ThemeProvider,
  Typography,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const theme = createTheme();

function PersonalPolicy() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#ECEFF1",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* app bar component */}
      <Appbar />

      <Container sx={{ py: 3 }} maxWidth="md">
        <Stack spacing={1}>
          <Item>개인정보보호방침</Item>
        </Stack>
      </Container>

      <Container sx={{ py: 3 }} maxWidth="md">
        <Card>
          <CardContent>
            <Typography
              align="center"
              gutterBottom
              variant="subtitle2"
              component="div"
            >
              개인정보보호방침
            </Typography>
          </CardContent>
        </Card>

        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            size="large"
            color="info"
            sx={{ height: 40 }}
            href="/Customer"
          >
            닫기
          </Button>
        </Box>
      </Container>

      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}
export default PersonalPolicy;
