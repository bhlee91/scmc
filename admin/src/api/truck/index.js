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
