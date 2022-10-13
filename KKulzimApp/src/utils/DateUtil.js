import moment from "moment";
import "moment-timezone";
import "moment/locale/ko";

// yyyy년MM월dd일 hh시mm분 -> return yyyy-mm-dd hh:mm:ss
export const formatStringToDateTime = (dateString) => {
  if (dateString === null || dateString === undefined) return ""

  dateString = moment(dateString, "YYYY년MM월DD일 HH시mm분").format("YYYY-MM-DD HH:mm:ss")

  return dateString
}

// return MM월 DD일
export const formatMonthAndDay = (dateString) => {
  if (dateString === null || dateString === undefined) return ""

  return moment(dateString).format("MM월 DD일")
}

// return korean time
export const formatDateTimeToKorea = (dateString) => {
  dateString = moment(dateString).tz("Asia/Seoul").format("YYYY년MM월DD일 HH시mm분")

  return dateString
}

export const formatDateTimeToString = (dateString) => {
  if (dateString === null || dateString === undefined) return ""

  dateString = moment(dateString).format("YYYY년MM월DD일 HH시mm분")

  return dateString
}

// return YYYY년MM월DD일
export const formatDate = (dateString) => {
  if (dateString === null || dateString === undefined) return ""

  dateString = moment(dateString).format("YYYY년MM월DD일")

  return dateString
}