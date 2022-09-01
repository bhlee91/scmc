import request from "src/request";

const BASE_URL = "/req"

export function getCommonCode() {
  return request({
    url: `${BASE_URL}/`,
    method: "get"
  })
}


export const getReqList = (ownerUid) =>   {
  return request({
    url: `${BASE_URL}/list/${ownerUid}`,
    method: "get"
  })
}