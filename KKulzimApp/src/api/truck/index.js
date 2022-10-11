import request from "request"

const BASE_URL = "/member"

export const getMainInfo = (uid) => {
  return request({
    url: `${BASE_URL}/truck/main/${uid}`,
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

export const getRequestListInRadius = (param) => {
  return request({
    url: `${BASE_URL}/truck/request?lat=${param.lat}&lon=${param.lon}&rad=${param.rad}`,
    method: "get"
  })
}