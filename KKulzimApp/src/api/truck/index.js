import request from "request"

const BASE_URL = "/member"

export const getMainInfo = (params) => {
  return request({
    url: `${BASE_URL}/truck/main/${params.uid}?lat=${params.lat}&lon=${params.lon}`,
    method: "get"
  })
}

export const getTruckOwnerCurrentLocation = (params) => {
  return request({
    url: `${BASE_URL}/truck/main/location?lat=${params.lat}&lon=${params.lon}`,
    method: "get"
  })
}

export const setCargoInfo = (obj) => {
  return request({
    url: `${BASE_URL}/cargo`,
    method: "post",
    data: obj
  })
}

export const getRequestListInRadius = (params) => {
  return request({
    url: `${BASE_URL}/truck/request?lat=${params.lat}&lon=${params.lon}&rad=${params.rad}&div=${params.div}`,
    method: "get"
  })
}
