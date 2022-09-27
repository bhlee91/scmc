import request from "request";

const BASE_URL = "/info";

export const getTruckSpec = () => {
  return request({
    url: `${BASE_URL}/truck/spec`,
    method: "get",
  })
}

export const getDashboardInfo = () => {
  return request({
    url: `${BASE_URL}/dashboard`,
    method: "get",
  })
}

export const getTermsInfo = () => {
  return request({
    url: "/customer/terms/Y",
    method: "get",
  })
}

export const getProductsInfo = () => {
  return request({
    url: `${BASE_URL}/product`,
    method: "get",
  })
}

export const setProductInfo = (obj) => {
  return request({
    url: `${BASE_URL}/product`,
    method: "post",
    data: obj
  })
}