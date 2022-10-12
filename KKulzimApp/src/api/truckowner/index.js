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

export const getAuth = (phoneNumber, authNumber) => {
  return request({
    url: `${BASE_URL}/smsLog`,
    method: "get",
    params: {
      phoneNumber,
      authNumber
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

export const loginTruckOwner = (obj) => {
  return request({
    url: `${BASE_URL}/truck/login`,
    method: "post",
    data: obj
  })
}