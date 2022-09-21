// 금액 콤마 찍기
export const formatFare = (fare) => {
  return fare.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}
