import moment from "moment";
import "moment/locale/ko";

// yyyy년MM월dd일 hh시mm분 -> return yyyy-mm-dd hh:mm:ss
export const formatStringToDateTime = (dateString) => {
  moment.locale("ko")
  dateString = moment(dateString, "YYYY년MM월DD일 HH시mm분").format("YYYY-MM-DD HH:mm:ss")

  return dateString
}