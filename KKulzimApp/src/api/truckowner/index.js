import request from "request"

const BASE_URL = "/member"

export const getAuthNumber = (phoneNumber) => {
  return request({
    url: `${BASE_URL}/sms`,
    method: "get",
    params: {
      phoneNumber
    }
  })
}

export const registTruckOwner = (obj) => {
  return request({
    url: `${BASE_URL}/truck`,
    method: "post",
    data: obj
  })
}