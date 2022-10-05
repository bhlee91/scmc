import moment from "moment";
import "moment/locale/ko";

// yyyy년MM월dd일 hh시mm분 -> return yyyy-mm-dd hh:mm:ss
export const formatStringToDateTime = (dateString) => {
  if (dateString === null || dateString === undefined) return ""

  moment.locale("ko")
  dateString = moment(dateString, "YYYY년MM월DD일 HH시mm분").format("YYYY-MM-DD HH:mm:ss")

  return dateString
}

// return MM월 DD일
export const formatMonthAndDay = (dateString) => {
  if (dateString === null || dateString === undefined) return ""
  
  moment.locale("ko")

  return moment(dateString).format("MM월 DD일")
}