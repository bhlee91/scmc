import request from "request";

export const getRequestsForMatching = (params) => {
  return request({
    url: `/cargo/request/matching?departDate=${params.departDate}&arrivalDate=${params.arrivalDate}&phoneNumber=${params.phoneNumber}&cargoName=${params.cargoName}&status=${params.status}&`,
    method: "get",
  })
}
