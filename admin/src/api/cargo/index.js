import request from "request";

const BASE_URL = "/cargo";

export const searchRequest = () => {
  return request({
    url: `${BASE_URL}/request`,
    method: "get",
  })
}
