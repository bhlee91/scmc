import request from "request"

const BASE_URL = "/member"

export const setCargoInfo = (obj) => {
  return request({
    url: `${BASE_URL}/cargo`,
    method: "post",
    data: obj
  })
}