import request from "request"

const BASE_URL = "/cargo"

export const apiTest = () => {
  return request({
    url: `${BASE_URL}/test`,
    method: "get",
  })
}