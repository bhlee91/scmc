import request from "request";

const BASE_URL = "/admin"

export const getDashboardInfo = () => {
  return request({
    url: `${BASE_URL}/dashboard`,
    method: "get",
  })
}
