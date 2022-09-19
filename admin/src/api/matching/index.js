import request from "request";

const BASE_URL = "/"

export const getTest = () => {
  return request({
    url: `${BASE_URL}/`,
    method: "get",
  })
}
