import request from "src/request";

const BASE_URL = "/cargo"

export function setRequest(data) {
  return request({
    url: `${BASE_URL}/request`,
    method: "post",
    data: data
  })
}

export function getRequestList(ownerUid) {
  return request({
    url: `${BASE_URL}/request/${ownerUid}`,
    method: "get"
  })
}

export function searchAddress(query) {
  return request({
    url: `${BASE_URL}/address?query=${query}`,
    method: "get"
  })
}