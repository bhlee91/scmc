import request from "request";

const BASE_URL = "/info";

export const getTruckSpec = () => {
  return request({
    url: `${BASE_URL}/truck/spec`,
    method: "get",
  });
};