import request from "request";

const BASE_URL = "/product";

export const getProductList = (useyn) => {
  return request({
    url: `${BASE_URL}/list/${useyn}`,
    method: "get"
  })
}