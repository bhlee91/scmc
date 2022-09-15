import request from "request";

const BASE_URL = "/member";

export const testApi = () => {
  return request({
    url: `${BASE_URL}/truck/1`,
    method: "get",
  });
};
