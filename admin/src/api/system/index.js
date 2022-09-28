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
    url: `${BASE_URL}/terms`,
    method: "get",
  })
}

export const setTermsInfo = (obj) => {
  return request({
    url: `${BASE_URL}/terms`,
    method: "post",
    data: obj,
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
    data: obj,
  })
}

export const getVersionInfo = () => {
  return request({
    url: `${BASE_URL}/version`,
    method: "get",
  })
}

export const uploadVersion = (formData) => {
  return request({
    url: `${BASE_URL}/uploadVersion`,
    method: "post",
    headers:{
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

export const downloadVersion = (verUid) => {
  return request({
    url: `${BASE_URL}/downloadVersion`,
    method: "get",
    headers:{
      'Content-Type': 'application/json',
      'Content-Disposition':''
    },
    responseType : 'blob',
    params: {
      verUid
    }
  })
}