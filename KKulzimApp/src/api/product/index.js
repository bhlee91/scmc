import request from "request";

const BASE_URL = "/product";

export const getCargoRequestDetail = (useyn) => {
  return request({
    url: `${BASE_URL}/list/${useyn}`,
    method: "get"
  })
}