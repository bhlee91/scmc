import request from "request";

const BASE_URL = "/admin";

export const login = (obj) => {
  return request({
    url: `${BASE_URL}/login`,
    method: "post",
    data: obj
  })
}

export const signup = (obj) => {
  return request({
    url: `${BASE_URL}/signup`,
    method: "post",
    data: obj
  })
}