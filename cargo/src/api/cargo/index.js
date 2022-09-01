import request from "src/request";

const BASE_URL = "/req"

export function setCargoRequest(data) {
  return request({
    url: `${BASE_URL}/cargo`,
    method: "post",
    body: data
  })
}

export function getReqList(ownerUid) {
  return request({
    url: `${BASE_URL}/list/${ownerUid}`,
    method: "get"
  })
}