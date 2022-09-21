import request from "request";

const BASE_URL = "/cargo";

export const searchAllRequest = (param) => {
  return request({
    url: `${BASE_URL}/request?departDate=${param.departDate}&arrivalDate=${param.arrivalDate}&phoneNumber=${param.phoneNumber}&status=${param.status}`,
    method: "get",
  })
}

export const saveRequestFare = (obj) => {
  return request({
    url: `${BASE_URL}/request/fare`,
    method: "put",
    data: obj
  })
}