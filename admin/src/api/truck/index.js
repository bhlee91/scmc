import request from "request";

const BASE_URL = "/member";

export const getTruckOwner = (truckownerUid) => {
  return request({
    url: `${BASE_URL}/truck/${truckownerUid}`,
    method: "get",
  });
};

export const getTruckOwnerList = (page, size, truckownerName, carNumber,  businessNo) => {
  return request({
    url: `${BASE_URL}/truck/ownerList`,
    method: "get",
    params: {
      page,
      size,
      truckownerName,
      carNumber,
      businessNo
    }
  })
}

export const modTruckOwner = (obj, uid) => {
  return request({
    url: `${BASE_URL}/truck/${uid}`,
    method: "put",
    data: obj
  })
}

export const uploadFile = (formData) => {
  return request({
    url: `/uploadFile`,
    method: "post",
    headers:{
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

export const downloadFile = (truckownerUid) => {
  return request({
    url: `/downloadFile`,
    method: "get",
    headers:{
      'Content-Type': 'application/json',
    },
    responseType : 'blob',
    params: {
      truckownerUid
    }
  })
}