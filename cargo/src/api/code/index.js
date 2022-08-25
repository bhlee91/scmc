import request from "@/request";

const BASE_URL = "/common"

export function getCommonCode() {
  return request({
    url: `${BASE_URL}/code`,
    method: "get"
  })
}