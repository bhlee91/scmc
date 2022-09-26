import Button from "components/MDButton";

const columns = [
  { field: "id", headerName: "ID", width: 130, headerClassName: "super-app-theme--header" },
  {
    field: "productName",
    headerName: "상품명",
    width: 400,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "price",
    headerName: "가격",
    width: 100,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "discountRate",
    headerName: "할인율",
    width: 200,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "productStartdt",
    headerName: "상품시작일",
    width: 300,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "productEnddt",
    headerName: "상품종료일",
    width: 300,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "useyn",
    headerName: "사용유무",
    width: 100,
    headerClassName: "super-app-theme--header",
    renderCell: () => (
      <Button variant="contained" color="success" size="small">
        사용
      </Button>
    ),
  },
];

export default columns;