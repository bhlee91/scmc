import Tooltip from "@mui/material/Tooltip";
import { formatDate } from "utils/dateUtils";

const termsType = {
  T01: "운송약관",
  T02: "이용약관",
  T03: "개인정보보호방침"
}

const columns = [
  { field: "termsUid", headerName: "ID", width: 100, headerClassName: "super-app-theme--header" },
  {
    field: "termsType",
    headerName: "약관 Type",
    width: 200,
    editable: false,
    hide: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "termsTypeName",
    headerName: "약관 Type",
    width: 200,
    editable: true,
    headerClassName: "super-app-theme--header",
    valueGetter: (params) => termsType[params.row.termsType]
  },
  {
    field: "versions",
    headerName: "버전",
    width: 150,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "contents",
    headerName: "내용",
    width: 200,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <Tooltip title={params.row.contents}>
        <span className="table-cell-trucate">{params.row.contents}</span>
      </Tooltip>
    )
  },
  {
    field: "expDiv",
    headerName: "노출채널",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "useYn",
    headerName: "사용유무",
    width: 100,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "regId",
    headerName: "등록자",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "regDt",
    headerName: "등록일",
    width: 150,
    headerClassName: "super-app-theme--header",
    valueGetter: (params) => formatDate(params.value),
  },
  {
    field: "modId",
    headerName: "수정자",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "modDt",
    headerName: "수정일",
    width: 150,
    headerClassName: "super-app-theme--header",
    valueGetter: (params) => formatDate(params.value),
  }
]

export default columns;