import moment from "moment";
import "moment/locale/ko";

// return NOW DATE (format: yyyy-mm-dd HH:mm:ss)
export const nowDateTime = () => {
  return moment().format("YYYY-MM-DD HH:mm:ss")
}

// return yyyy년mm월dd일 hh:mm
export const formatInKorea = (dateString) => {
  dateString = moment(dateString)

  return `${dateString.format("YYYY년MM월DD일")} ${dateString.format("HH:mm")}`
}

// yyyy년MM월dd일 hh:mm -> return yyyy-mm-dd hh:mm
export const formatStringToDateTime = (dateString) => {
  dateString = dateString.replace(" ", "")

  if (dateString.includes("년")) {
    dateString = dateString.replace("년", "-")
  }

  if (dateString.includes("월")) {
    dateString = dateString.replace("월", "-")
  }

  if (dateString.includes("일")) {
    dateString = dateString.replace("일", "T")
  }

  return dateString.substring(0, 16)
}

// return yyyy-mm-dd hh:mi24
export const formatDateTime = (dateTimeString) => {
  dateTimeString = moment(dateTimeString)

  return dateTimeString.format("YYYY-MM-DD HH:mm")
}

// return yyyy-mm-dd
export const formatDate = (dateTimeString) => {
  dateTimeString = moment(dateTimeString)

  return dateTimeString.format("YYYY-MM-DD")
}