import request from "request"

const BASE_URL = "/member"

export const getMainInfo = (param) => {
  return request({
    url: `${BASE_URL}/truck/main/${param.truckownerUid}`,
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