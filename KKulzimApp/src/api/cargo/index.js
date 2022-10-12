import request from "request";

const BASE_URL = "/cargo";

export const getCargoRequestDetail = (param) => {
  return request({
    url: `${BASE_URL}/request/detail/${param}`,
    method: "get"
  })
}