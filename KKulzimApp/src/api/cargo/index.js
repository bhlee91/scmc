import request from "request";

const BASE_URL = "/cargo";

export const getCargoRequestDetail = (param) => {
  return request({
    url: `${BASE_URL}/request/detail/${param}`,
    method: "get"
  })
}

export const getMyTransit = (truckownerUid) => {
  return request({
    url: `${BASE_URL}/transit/${truckownerUid}`,
    method: "get"
  })
}