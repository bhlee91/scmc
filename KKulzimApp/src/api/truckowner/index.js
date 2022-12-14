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

export const changePassword = (obj) => {
  return request({
    url: `${BASE_URL}/truck/chpwd`,
    method: "post",
    data: obj
  })
}

export const confirmAccount = (obj) => {
  return request({
    url: `${BASE_URL}/truck/confirm`,
    method: "post",
    data: obj
  })
}

export const getTruckowner = (carNumber) => {
  return request({
    url: `${BASE_URL}/truckowner/${carNumber}`,
    method: "get",
    param: carNumber
  })
}

export const updateTruckowner = (obj,carNumber) => {
  return request({
    url: `${BASE_URL}/truck/mod/${carNumber}`,
    method: "put",
    data: obj
  })
}