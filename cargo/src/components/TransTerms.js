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
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const theme = createTheme();

function TransTerms() {
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
      <ImageList sx={{ width: 500, height: 150 }} variant="woven" cols={1}>
        <ImageListItem>
          <img src="./image/6.jpg" alt="가로세로" loading="lazy" />
        </ImageListItem>
      </ImageList>
      <Divider />

      <Container sx={{ py: 3 }} maxWidth="md">
        <Stack spacing={1}>
          <Item>운송약관</Item>
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
              이용약관
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
export default TransTerms;
