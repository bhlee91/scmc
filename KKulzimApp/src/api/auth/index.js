import request from "request"

const BASE_URL = "/auth"

export const login = (obj) => {
  return request({
    url: `${BASE_URL}/truck`,
    method: "post",
    data: obj
  })
}