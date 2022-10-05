import request from "request"

const BASE_URL = "/member"

export const registTruckOwner = (obj) => {
  return request({
    url: `${BASE_URL}/truck`,
    method: "post",
    data: obj
  })
}