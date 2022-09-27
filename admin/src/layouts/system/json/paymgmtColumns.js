import Button from "components/MDButton";
import { formatFare } from "utils/commonUtils";
import { formatDate } from "utils/dateUtils";

const columns = [
  { 
    field: "id", 
    headerName: "순번", 
    width: 70, 
    headerAlign: "center", 
    align: "center", 
    headerClassName: "super-app-theme--header",
  },
  { 
    field: "productUid", 
    headerName: "ID", 
    width: 70, 
    headerAlign: "center", 
    align: "center", 
    headerClassName: "super-app-theme--header" 
  },
  {
    field: "productName",
    headerName: "상품명",
    width: 400,
    editable: true,
    headerAlign: "center",
    align: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "price",
    headerName: "가격",
    width: 100,
    editable: true,
    headerAlign: "center",
    align: "center",
    headerClassName: "super-app-theme--header",
    valueGetter: (params) => formatFare(params.value),
  },
  {
    field: "discountRate",
    headerName: "할인율",
    width: 200,
    headerAlign: "center",
    align: "center",
    headerClassName: "super-app-theme--header",
    valueGetter: (params) => `${params.value}%`,
  },
  {
    field: "productStartdt",
    headerName: "상품시작일",
    width: 300,
    headerAlign: "center",
    align: "center",
    headerClassName: "super-app-theme--header",
    valueGetter: (params) => formatDate(params.value),
  },
  {
    field: "productEnddt",
    headerName: "상품종료일",
    width: 300,
    headerAlign: "center",
    align: "center",
    headerClassName: "super-app-theme--header",
    valueGetter: (params) => formatDate(params.value),
  },
  {
    field: "useyn",
    headerName: "사용유무",
    width: 100,
    headerAlign: "center",
    align: "center",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      return (
        <Button variant="contained" color={params.value === "Y" ? "success" : "error"} size="small">
          {params.value === "Y" ? "사용" : "미사용"}
        </Button>
      )
    },
  },
];

export default columns;