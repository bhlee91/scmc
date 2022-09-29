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
import { useSnackbar } from "notistack";

import { 
  getVersionInfo, uploadVersion, downloadVersion
} from "api/system/index";





function Vermgmt() {
  const { enqueueSnackbar } = useSnackbar()
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [rowId, setRowId] = React.useState(0);
  const [verFile, setVerFile] = React.useState([]);
  const [values, setValues] = React.useState([]);
  const [fileName, setFileName] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const columns = [
    { field: "verUid", 
      headerName: "ID", 
      width: 150, 
      headerClassName: "super-app-theme--header" },
    {
      field: "appVersion",
      headerName: "앱 버전",
      width: 200,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "appDesc",
      headerName: "설명",
      width: 890,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "download",
      headerName: "다운로드",
      width: 300,
      headerClassName: "super-app-theme--header",
      renderCell: () => (
        <Button variant="contained" color="info" size="small" onClick ={versionDownload}>
          다운로드
        </Button>
      ),
    },
  ];

  const regButtonClick = () => {
    setOpen(true);
  }

  const closeButtonClick = () => {
    setFileName('');
    setVerFile([]);
    setValues([]);
    setOpen(false);
    callVersionList();
  }

  const handleClick = (params) => {
    setRowId(params.row.verUid)
  };


  //  팝
  const inputhandleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const callVersionList = () => {
    getVersionInfo()
    .then((res) => {
      setRows(res.data)
    })
  }

  const fileInputRef = React.useRef(null);
  const verFileHandleClick = (e) => {
    fileInputRef.current.click();
  }
  const verFileHandleChange = (e) =>{
    setVerFile(e.target.files[0]);
    setFileName(e.target.files[0].name)
  }

  const onVerFileUpload = () => {
    const formData = new FormData();
    if(verFile !== null){
      formData.append('multipartFile', verFile);
      formData.append('appVersion', values.appVersion)
      formData.append('appDesc', values.appDesc)
      uploadVersion(formData)
      .then(() => {
        enqueueSnackbar("등록완료.", {
          variant: "success"
        })
        closeButtonClick();
      })  
    }
  }

  const validationRegist = () =>{

    if(values.appVersion === '' || values.appVersion === null || values.appVersion === undefined){
      enqueueSnackbar("앱버전을 입력하세요.", {
        variant: "warning"
      })
      return false;
    } else if(verFile.length === 0){
      enqueueSnackbar("파일을 등록해주세요.", {
        variant: "warning"
      })
      return false;
    } else if(values.appDesc === ''|| values.appDesc === null || values.appDesc === undefined){
      enqueueSnackbar("설명을 입력하세요.", {
        variant: "warning"
      })
      return false;
    } else {
      return true
    }

  }

  const registerVersion = () => {
    if(validationRegist()){
      onVerFileUpload()
    }
  }

  const versionDownload = () => {    
    if(rowId !== 0){
      downloadVersion(rowId)
      .then((res) => {
        const blob = new Blob([res.data])
        const fileUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = fileUrl
        link.style.display = "none"
        console.log(res)
        const injectFilename = (res) => { 
          const disposition = res.headers['content-disposition'];
          
          console.log(disposition)
          const fname = decodeURI(
          disposition)
            // .match(/fileName[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
            // .replace(/['"]/g, ''))
          return fname;
        }
        link.download = injectFilename(res)
        document.body.appendChild(link)
        link.click();
        link.remove();
  
        window.URL.revokeObjectURL(fileUrl)
      })
    }
  }
  
  React.useEffect(() => {
    callVersionList()
  },[])
  // 상세정보 끝

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
            getRowId={(obj) => obj.verUid}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            rowSpacingType="border"
            density="compact"
            onRowClick={handleClick}
            sx={{ fontSize: 14, fontFamily: "-apple-system", fontWeight: 400 }}
          />
        </MDBox>
      </Stack>
      <Divider />

      <Grid container>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button color="info" onClick={regButtonClick}>
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
          onClose={closeButtonClick}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "800px", // Set your width here
              },
            },
          }}
        >
          <DialogTitle id="responsive-dialog-title">APP 등록</DialogTitle>
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
                                    앱버전
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="appVersion"
                                    value={values.appVersion}
                                    onChange={inputhandleChange("appVersion")}
                                    fullWidth
                                    size="small"
                                  />
                                </Grid>
                                <Grid item xs={6}/>
                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    파일업로드
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    id="fileName"
                                    value={fileName}
                                    onChange={inputhandleChange("fileName")}
                                    fullWidth
                                    size="small"
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <Button variant="contained" color="secondary" component="label" onClick={verFileHandleClick}>
                                    Upload
                                  </Button>
                                  <input 
                                    accept="*" 
                                    multiple 
                                    type="file" 
                                    onChange={verFileHandleChange} 
                                    ref={fileInputRef}
                                    style={{display: "none"}}
                                    />
                                </Grid>

                                <Divider />

                                <Grid item xs={2}>
                                  <MDTypography
                                    gutterBottom
                                    variant="body2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    설명
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={6}>
                                  <MDTypography gutterBottom>
                                    <TextField
                                      id="appDesc"
                                      value={values.appDesc}
                                      onChange={inputhandleChange("appDesc")}
                                      fullWidth
                                      size="small"
                                    />
                                  </MDTypography>
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
              onClick={registerVersion}
            >
              등록
            </Button>
            <Button
              autoFocus
              variant="contained"
              color="info"
              component="label"
              onClick={closeButtonClick}
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </MDBox>
  );
}

export default Vermgmt;
